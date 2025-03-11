import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Escritorio from './componentes/Principal/Escritorio.jsx'
import './assets/css/fondo.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Escritorio />
  </StrictMode>
);
