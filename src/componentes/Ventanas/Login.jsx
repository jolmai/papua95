import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import { Window, WindowHeader, WindowContent, Button, TextInput } from 'react95';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Todos los campos son obligatorios");
        return;
      }

      // Create email from username
      const userEmail = `${username}@gmail.com`;
      
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, userEmail, password);
      console.log('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential') {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error al iniciar sesión: " + err.message);
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      console.log('Guest login successful!');
      navigate('/');
    } catch (err) {
      console.error('Guest login error:', err);
      setError("Error al iniciar sesión como invitado: " + err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <ThemeProvider theme={original}>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999
      }}>
        <Window style={{ width: '400px' }}>
          <WindowHeader className='barraVentana'>
            <span>Login</span>
          </WindowHeader>
          <WindowContent>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <TextInput
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextInput
                placeholder='Contraseña'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button type="submit">
                Login
              </Button>
              <Button onClick={goToRegister}>
                Registrarse
              </Button>
              <div style={{ textAlign: 'center', margin: '8px 0' }}>--------------------------------------------</div>
              <Button onClick={handleGuestLogin}>
                Invitado
              </Button>
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default Login; 