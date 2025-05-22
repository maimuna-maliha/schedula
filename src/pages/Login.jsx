import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
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
        onSubmit={handleEmailLogin}
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
        <h2 style={{ marginBottom: '1rem' }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '1rem' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '1rem' }}
        />

        <div style={{ width: '100%', marginBottom: '0.5rem' }}>
          <button type="submit" style={{ width: '50%' }}>
            Login
          </button>
        </div>

        <div style={{ width: '100%' }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{ width: '50%', backgroundColor: '#d1495b' }}
          >
            Continue with Google
          </button>
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <Link to="/reset-password">Forgot Password?</Link> |{' '}
          <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
