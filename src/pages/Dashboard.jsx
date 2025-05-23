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
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <Drawer />

      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 1rem',
          textAlign: 'center'
        }}
      >
        <h1 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Welcome, {userName}!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          What do you want to schedule today?
        </p>

        <div style={{ width: '100%', marginBottom: '2rem' }}>
          {['class', 'meeting', 'event'].map((type) => (
            <label
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                marginBottom: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: selection === type ? '#e6f0ff' : '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              <input
                type="radio"
                name="type"
                value={type}
                checked={selection === type}
                onChange={(e) => setSelection(e.target.value)}
                style={{ marginRight: '1rem' }}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        <button
          onClick={handleSchedule}
          style={{
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#0077b6',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
