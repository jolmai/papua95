import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import WinToolbar from './WinToolbar.jsx'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: teal;
    margin: 0;
    padding: 0;
    font-family: 'ms_sans_serif';
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <WinToolbar />
  </StrictMode>
);
