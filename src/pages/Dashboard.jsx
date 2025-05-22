import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Drawer from '../components/Drawer';

function Dashboard() {
  const [userName, setUserName] = useState('');
  const [selection, setSelection] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const user = auth.currentUser;
  if (user) {
    setUserName(user.displayName || user.email.split('@')[0]);
  }
}, []);


  const handleSchedule = () => {
    if (selection === 'class') {
      navigate('/class-scheduler');
    } else if (selection) {
      alert(`${selection === 'event' ? 'Event' : 'Meeting'} Scheduler is coming soon!`);
    } else {
      alert('Please select an option!');
    }
  };

  return (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Drawer />

    <div
      style={{
        height: '80vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <h1 style={{ marginBottom: '0.5rem' }}>Welcome {userName}!</h1>
      <p style={{ marginBottom: '1.5rem' }}>What do you want to schedule?</p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          <input
            type="radio"
            name="type"
            value="class"
            onChange={(e) => setSelection(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          Class
        </label>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          <input
            type="radio"
            name="type"
            value="meeting"
            onChange={(e) => setSelection(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          Meeting
        </label>
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <input
            type="radio"
            name="type"
            value="event"
            onChange={(e) => setSelection(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          Event
        </label>
      </div>

      <button onClick={handleSchedule}>Continue</button>
      </div>
    </div>
  );
}

export default Dashboard;
