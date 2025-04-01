import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import { Window, WindowHeader, WindowContent, Button, TextInput } from 'react95';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Validaciones
      if (!username || !password || !confirmPassword) {
        setError("Todos los campos son obligatorios");
        return;
      }

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      // Crear el email basado en el nombre de usuario
      const userEmail = `${username}@gmail.com`;
      
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
      
      // Guardar información básica en Firestore
      await setDoc(doc(db, "Usuarios", userCredential.user.uid), {
        email: userEmail,
        usuario: username
      });

      console.log('Registro exitoso!');
      navigate('/');
    } catch (err) {
      console.error('Error de registro:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError("El usuario ya está registrado");
      } else {
        setError("Error al registrar: " + err.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const goToLogin = () => {
    navigate('/login');
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
            <span>Registro</span>
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
              <TextInput
                placeholder='Confirmar Contraseña'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
              <Button type="submit">
                Registrarse
              </Button>
              <div style={{ textAlign: 'center', margin: '8px 0' }}>or</div>
              <Button onClick={goToLogin}>
                Volver al Login
              </Button>
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default Register; 