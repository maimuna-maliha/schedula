import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset link sent to your email.");
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
      }}
    >
      <form
        onSubmit={handleReset}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '350px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Reset Password</h2>

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '1rem' }}
        />

        <button type="submit" style={{ width: '50%' }}>
          Send Reset Link
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
