import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name
      await updateProfile(userCredential.user, { displayName: name });

      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg)',
    }}>
      <form
        onSubmit={handleEmailSignup}
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
        <h2 style={{ marginBottom: '1rem' }}>Signup</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '1rem' }}
        />

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
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '90%', marginBottom: '1rem' }}
        />
  
        <div style={{ width: '100%', marginBottom: '0.5rem' }}>
          <button type="submit" style={{ width: '50%' }}>
            Create Account
          </button>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          style={{ width: '50%', backgroundColor: '#d1495b', marginTop: '0.5rem' }}
        >
          Continue with Google
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <Link to="/login">Already have an account?</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
