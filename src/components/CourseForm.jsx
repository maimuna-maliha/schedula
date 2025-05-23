import { useState } from 'react';

const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function CourseForm({ onAddCourse, courses }) {
  const [code, setCode] = useState('');
  const [section, setSection] = useState('');
  const [credit, setCredit] = useState('');
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [error, setError] = useState('');
  const [confirmOvernight, setConfirmOvernight] = useState(false);
  const [showOvernightWarning, setShowOvernightWarning] = useState(false);

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShowOvernightWarning(false);

    const trimmedCode = code.trim();
    const trimmedSection = section.trim();

    if (!trimmedCode || !trimmedSection || !credit || days.length === 0) {
      setError('Please fill in all fields and select at least one day.');
      return;
    }

    if (startTime === endTime) {
      setError('Start and end time cannot be the same.');
      return;
    }

    if (startTime > endTime && !confirmOvernight) {
      setShowOvernightWarning(true);
      return;
    }

    const duplicate = courses.some(
      (c) =>
        c.code.trim().toLowerCase() === trimmedCode.toLowerCase() &&
        c.section.trim().toLowerCase() === trimmedSection.toLowerCase()
    );
    if (duplicate) {
      setError(`Section "${trimmedSection}" already exists for course "${trimmedCode}".`);
      return;
    }

    const newCourse = {
      code: trimmedCode,
      section: trimmedSection,
      credit: parseFloat(credit),
      days,
      startTime,
      endTime
    };

    onAddCourse(newCourse);

    setCode('');
    setSection('');
    setCredit('');
    setDays([]);
    setStartTime('08:00');
    setEndTime('10:00');
    setConfirmOvernight(false);
    setShowOvernightWarning(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add a Course</h3>

      {error && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</p>}

      {showOvernightWarning && (
        <div style={{ marginBottom: '0.5rem', color: 'orange' }}>
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{ flex: '1 1 200px', minWidth: '140px' }}
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
          style={{ flex: '1 1 100px', minWidth: '100px' }}
        />
        <input
          type="number"
          placeholder="Credit"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          min="0"
          step="0.5"
          required
          style={{ flex: '1 1 100px', minWidth: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Days:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {allDays.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                value={day}
                checked={days.includes(day)}
                onChange={() => toggleDay(day)}
              />{' '}
              {day}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <label>
          Start Time:{' '}
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setConfirmOvernight(false);
              setShowOvernightWarning(false);
            }}
          />
        </label>

        <label>
          End Time:{' '}
          <input
            type="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              setConfirmOvernight(false);
              setShowOvernightWarning(false);
            }}
          />
        </label>
      </div>

      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;
