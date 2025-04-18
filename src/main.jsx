import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebaseConfig';
import Login from './componentes/Ventanas/Login.jsx';
import Register from './componentes/Ventanas/Register.jsx';
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Escritorio /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
