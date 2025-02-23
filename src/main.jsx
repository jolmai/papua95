import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import WinToolbar from './componentes/WinToolbar.jsx'
import './assets/css/fondo.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WinToolbar />
  </StrictMode>
);
