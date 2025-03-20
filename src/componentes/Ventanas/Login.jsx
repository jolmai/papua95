import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { Window, WindowHeader, WindowContent, Button, TextField } from 'react95';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Authentication state will be updated automatically
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999
    }}>
      <Window>
        <WindowHeader>
          <span>Login</span>
        </WindowHeader>
        <WindowContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TextField
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button onClick={handleLogin}>
              Login
            </Button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}

export default Login; 