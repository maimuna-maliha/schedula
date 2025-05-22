import { useState } from 'react';

function CourseManager({ courses, onEditCourse, onRemoveCourse }) {
  const [editTarget, setEditTarget] = useState({ code: '', section: '' });
  const [newCredit, setNewCredit] = useState('');
  const [newDays, setNewDays] = useState([]);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [error, setError] = useState('');
  const [showOvernightWarning, setShowOvernightWarning] = useState(false);
  const [confirmOvernight, setConfirmOvernight] = useState(false);

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    setNewDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const formatTimeToAmPm = (time) => {
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minuteStr} ${ampm}`;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setError('');
    setShowOvernightWarning(false);

    const trimmedCode = editTarget.code.trim();
    const trimmedSection = editTarget.section.trim();

    const course = courses.find(
      (c) =>
        c.code.trim().toLowerCase() === trimmedCode.toLowerCase() &&
        c.section.trim().toLowerCase() === trimmedSection.toLowerCase()
    );

    if (!course) {
      setError('Course not found.');
      return;
    }

    const updatedStart = newStartTime || course.startTime;
    const updatedEnd = newEndTime || course.endTime;

    if (updatedStart === updatedEnd) {
      setError('Start and end time cannot be the same.');
      return;
    }

    if (updatedStart > updatedEnd && !confirmOvernight) {
      setShowOvernightWarning(true);
      return;
    }

    const updatedCourse = {
      ...course,
      credit: newCredit || course.credit,
      days: newDays.length ? newDays : course.days,
      startTime: updatedStart,
      endTime: updatedEnd,
    };

    onEditCourse(updatedCourse);

    // Reset fields
    setEditTarget({ code: '', section: '' });
    setNewCredit('');
    setNewDays([]);
    setNewStartTime('');
    setNewEndTime('');
    setError('');
    setConfirmOvernight(false);
    setShowOvernightWarning(false);
  };

  const handleRemove = () => {
    const trimmedCode = editTarget.code.trim();
    const trimmedSection = editTarget.section.trim();

    const course = courses.find(
      (c) =>
        c.code.trim().toLowerCase() === trimmedCode.toLowerCase() &&
        c.section.trim().toLowerCase() === trimmedSection.toLowerCase()
    );

    if (!course) {
      setError('Course not found.');
      return;
    }

    onRemoveCourse(trimmedCode, trimmedSection);
    setEditTarget({ code: '', section: '' });
    setError('');
    setConfirmOvernight(false);
  };

  const sortedCourses = [...courses].sort((a, b) =>
    a.code.toLowerCase().localeCompare(b.code.toLowerCase())
  );

  return (
    <div>
      <h3>Edit or Remove a Course</h3>

      {error && (
        <p style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</p>
      )}

      {showOvernightWarning && (
        <div style={{ color: 'orange', marginBottom: '0.5rem' }}>
          <p>⚠ End time is earlier than start time. Do you want to continue?</p>
          <label>
            <input
              type="checkbox"
              checked={confirmOvernight}
              onChange={(e) => setConfirmOvernight(e.target.checked)}
            />{' '}
            Yes, this is an overnight class.
          </label>
        </div>
      )}

      <form onSubmit={handleEdit}>
        <input
          type="text"
          placeholder="Course Code or Title"
          value={editTarget.code}
          onChange={(e) => setEditTarget({ ...editTarget, code: e.target.value })}
          required
          style={{ width: '50%', marginBottom: '1rem' }}
        />
        <input
          type="text"
          placeholder="Section"
          value={editTarget.section}
          onChange={(e) => setEditTarget({ ...editTarget, section: e.target.value })}
          required
        />
        <br />
        <input
          type="number"
          placeholder="New Credit"
          value={newCredit}
          onChange={(e) => setNewCredit(e.target.value)}
        />
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <label>New Days: </label>
          {allDays.map((day) => (
            <label key={day} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                value={day}
                checked={newDays.includes(day)}
                onChange={() => toggleDay(day)}
              />{' '}
              {day}
            </label>
          ))}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Start Time: </label>
          <input
            type="time"
            value={newStartTime}
            onChange={(e) => {
              setNewStartTime(e.target.value);
              setConfirmOvernight(false);
              setShowOvernightWarning(false);
            }}
          />
          <label style={{ marginLeft: '1rem' }}>End Time: </label>
          <input
            type="time"
            value={newEndTime}
            onChange={(e) => {
              setNewEndTime(e.target.value);
              setConfirmOvernight(false);
              setShowOvernightWarning(false);
            }}
          />
        </div>

        <button type="submit">Update Course</button>
        <button type="button" onClick={handleRemove} style={{ marginLeft: '1rem' }}>
          Remove Course
        </button>
      </form>

      <hr />

      <h3>All Courses</h3>
      {sortedCourses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem',
            textAlign: 'center',
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
            {sortedCourses.map((c, i) => (
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
      )}
    </div>
  );
}

export default CourseManager;
