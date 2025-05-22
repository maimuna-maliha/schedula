import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Drawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <div
        style={{
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'absolute',
          top: '1rem',
          left: '1rem'
        }}
        onClick={() => setOpen(!open)}
      >
        ≡
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '3.5rem',
            left: '1rem',
            background: '#f0f0f0',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        >
          <Link to="/">Home</Link><br />
          {user && <Link to="/dashboard">Dashboard</Link>}<br />
          {user && <Link to="/class-scheduler">Class Scheduler</Link>}<br />
          {user && <button onClick={logout}>Logout</button>}
        </div>
      )}
    </>
  );
}

export default Drawer;
