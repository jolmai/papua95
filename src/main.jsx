import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';
import Login from './componentes/Ventanas/Login.jsx';
import './assets/css/fondo.css';
import Escritorio from './componentes/Principal/Escritorio.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StrictMode>
      {isAuthenticated ? <Escritorio /> : <Login />}
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
