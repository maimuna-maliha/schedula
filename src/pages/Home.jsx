import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f9fafe, #eaf0ff)'
      }}
    >
      {/* Logo */}
      <img
        src="/schedula-icon.png"
        alt="Schedula Logo"
        style={{
          width: '200px',
          height: '55px',
          marginBottom: '1rem',
          borderRadius: '12px',
        }}
      />

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>
        Welcome to <span style={{ color: '#0077b6' }}>Schedula</span>
      </h1>

      <h3 style={{ marginBottom: '1rem', color: '#666' }}>Your Chaos Ends Here</h3>

      <p style={{ maxWidth: '500px', marginBottom: '2rem', fontSize: '1.1rem', color: '#444' }}>
        <strong>
          Plan your life better. <br />Class, Event, or Meeting — we’ll handle it!
        </strong>
      </p>

      <button
        onClick={() => navigate('/login')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#0077b6',
          color: '#fff',
          cursor: 'pointer',
          transition: 'background 0.3s ease'
        }}
      >
        Start Scheduling →
      </button>
    </div>
  );
}

export default Home;
