// Convert "HH:MM" to total minutes
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Handle time ranges that cross midnight
function timeRangesOverlap(startA, endA, startB, endB) {
  const normalize = (start, end) =>
    end <= start ? [start, end + 24 * 60] : [start, end];
  const [sA, eA] = normalize(startA, endA);
  const [sB, eB] = normalize(startB, endB);
  return sA < eB && sB < eA;
}

// Check if two courses overlap in time and day
function hasConflict(courseA, courseB) {
  const commonDays = courseA.days.filter(day => courseB.days.includes(day));
  if (commonDays.length === 0) return false;

  const startA = toMinutes(courseA.startTime);
  const endA = toMinutes(courseA.endTime);
  const startB = toMinutes(courseB.startTime);
  const endB = toMinutes(courseB.endTime);

  return timeRangesOverlap(startA, endA, startB, endB);
}

// Check if course can be added without time/section conflict
function isConflictFree(schedule, newCourse) {
  return schedule.every(existing =>
    !hasConflict(existing, newCourse) &&
    existing.code !== newCourse.code
  );
}

// Recursive backtracking to build all valid schedules
function backtrack(index, courses, current, all) {
  if (index === courses.length) {
    if (current.length > 0) {
      all.push({
        schedule: [...current],
        totalCredits: current.reduce((sum, c) => sum + parseFloat(c.credit), 0),
        courseCount: current.length
      });
    }
    return;
  }

  const course = courses[index];

  if (isConflictFree(current, course)) {
    current.push(course);
    backtrack(index + 1, courses, current, all);
    current.pop();
  }

  backtrack(index + 1, courses, current, all); // skip course
}

// Get all valid schedules (non-empty only)
export function generateAllSchedules(courses) {
  const all = [];
  backtrack(0, courses, [], all);
  return all;
}

// Get best schedule by max total credits under optional limit
export function generateBestSchedule(courses, creditLimit = Infinity) {
  const all = generateAllSchedules(courses);
  let best = null;
  let maxCredits = 0;

  for (const item of all) {
    if (item.totalCredits > maxCredits && item.totalCredits <= creditLimit) {
      maxCredits = item.totalCredits;
      best = item;
    }
  }

  return best || { schedule: [], totalCredits: 0, courseCount: 0 };
}
