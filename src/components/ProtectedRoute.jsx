import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return userLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
