import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import { Window, WindowHeader, WindowContent, Button, TextInput } from 'react95';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting login with username:', username);
      
      // Query Firestore to get the email associated with the username
      const usersRef = collection(db, "Usuarios");
      const q = query(usersRef, where("usuario", "==", username));
      
      console.log('Querying Firestore for user...');
      const querySnapshot = await getDocs(q);
      console.log('Query results:', querySnapshot.size, 'documents found');

      if (querySnapshot.empty) {
        console.log('No user found with username:', username);
        setError("Usuario no encontrado");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log('User data found:', { ...userData, password: '***' });
      const userEmail = userData.email;

      // Sign in with email and password
      console.log('Attempting Firebase Auth with email:', userEmail);
      await signInWithEmailAndPassword(auth, userEmail, password);
      console.log('Login successful!');
      // Authentication state will be updated automatically
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential') {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error al iniciar sesión: " + err.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission
    handleLogin();
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
        <Window>
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
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default Login; 