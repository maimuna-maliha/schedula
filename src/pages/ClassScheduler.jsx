import { useState } from 'react';
import CourseForm from '../components/CourseForm';
import CourseManager from '../components/CourseManager';
import { generateBestSchedule, generateAllSchedules } from '../utils/scheduler';
import Drawer from '../components/Drawer';

// Convert 24h to 12h with AM/PM
function formatTimeToAmPm(time) {
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, '0')}:${time.split(':')[1]} ${ampm}`;
}

function ClassScheduler() {
  const [courses, setCourses] = useState([]);
  const [creditLimit, setCreditLimit] = useState('');
  const [bestSchedule, setBestSchedule] = useState(null); // changed from []
  const [allSchedules, setAllSchedules] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const addCourse = (course) => {
    setCourses(prev => [...prev, course]);
  };

  const editCourse = (updatedCourse) => {
    setCourses(prev =>
      prev.map(c =>
        c.code === updatedCourse.code && c.section === updatedCourse.section
          ? updatedCourse
          : c
      )
    );
  };

  const removeCourse = (code, section) => {
    setCourses(prev => prev.filter(c => !(c.code === code && c.section === section)));
  };

  const generateSchedules = () => {
    const best = generateBestSchedule(courses, parseFloat(creditLimit) || Infinity);
    const all = generateAllSchedules(courses);
    setBestSchedule(best || null);
    setAllSchedules(all);
    setShowAll(false);
  };

const renderScheduleTable = (schedule) => {
  // Sort courses alphabetically by course code
  const sorted = [...schedule].sort((a, b) =>
    a.code.toLowerCase().localeCompare(b.code.toLowerCase())
  );

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        border="1"
        cellPadding="8"
        style={{
          width: '100%',
          minWidth: '600px', // allow horizontal scroll on small screens
          borderCollapse: 'collapse',
          marginTop: '1rem',
          textAlign: 'center'
        }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Course Code</th>
            <th>Section</th>
            <th>Credit</th>
            <th>Days</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={i}>
              <td>{c.code}</td>
              <td>{c.section}</td>
              <td>{c.credit}</td>
              <td>{c.days.join(', ')}</td>
              <td>{formatTimeToAmPm(c.startTime)}</td>
              <td>{formatTimeToAmPm(c.endTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Drawer />
      <h1>Class Scheduler</h1>

      <CourseForm onAddCourse={addCourse} courses={courses} />

      {courses.length > 0 && (
        <>
          <CourseManager
            courses={courses}
            onEditCourse={editCourse}
            onRemoveCourse={removeCourse}
          />

          <div style={{ marginBottom: '1rem' }}>
            <label>
              Max Credit Limit:{' '}
              <input
                type="number"
                step="0.5"
                min="0"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
              />
            </label>
          </div>

          <button onClick={generateSchedules}>Generate Best Schedule</button>
        </>
      )}

      {bestSchedule && bestSchedule.schedule.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Best Schedule</h3>
          <p>
            Total Credits: <strong>{bestSchedule.totalCredits}</strong> | Courses:{' '}
            <strong>{bestSchedule.courseCount}</strong>
          </p>

          {renderScheduleTable(bestSchedule.schedule)}

          <button
            onClick={() => setShowAll(!showAll)}
            style={{ marginTop: '1rem' }}
          >
            {showAll ? 'Hide All Schedules' : 'Show All Possible Schedules'}
          </button>

          <button
            onClick={() => window.print()}
            style={{ marginLeft: '1rem' }}
          >
            Print / Save as PDF
          </button>
        </div>
      )}

      {showAll && allSchedules.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>All Possible Schedules</h3>
          {allSchedules.map((item, idx) => {
            const totalCredits = item.schedule.reduce(
              (sum, c) => sum + parseFloat(c.credit),
              0
            );
            const courseCount = item.schedule.length;

            return (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <h4>Schedule {idx + 1}</h4>
                <p>
                  Total Credits: <strong>{totalCredits}</strong> | Courses:{' '}
                  <strong>{courseCount}</strong>
                </p>

                {renderScheduleTable(item.schedule)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ClassScheduler;
