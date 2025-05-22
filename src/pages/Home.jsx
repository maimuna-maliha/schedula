import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1>Welcome to Schedula</h1>
      <h3>Your Chaos Ends Here</h3>
      <p><b>Plan your life better. Class, Event, or Meeting — we'll handle it!</b></p>
      <button onClick={() => navigate('/login')}>Start Scheduling</button>
      
    </div>
  );
}

export default Home;
