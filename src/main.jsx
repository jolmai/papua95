import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebaseConfig';
import Login from './componentes/Ventanas/Login.jsx';
import './assets/css/fondo.css';
import Escritorio from './componentes/Principal/Escritorio.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear authentication state when component mounts
    signOut(auth).then(() => {
      setLoading(false);
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <StrictMode>
      {isAuthenticated ? <Escritorio /> : <Login />}
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
