import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Drawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div>
      {/* Hamburger Menu */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          fontSize: '1.04rem',
          cursor: 'pointer',
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1000,
          backgroundColor: '#fff',
          borderRadius: '6px',
          padding: '0.3rem 0.6rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}
      >
        ≡
      </div>

      {/* Drawer Panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: '4rem',
            left: '1rem',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            zIndex: 999,
            width: '150px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {user && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
            {user && <Link to="/class-scheduler" onClick={() => setOpen(false)}>Class Scheduler</Link>}
            {user && (
              <button
                onClick={logout}
                style={{
                  background: '#0077b6',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

export default Drawer;
