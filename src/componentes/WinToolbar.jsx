import React from 'react';
import { Button, AppBar, Toolbar } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import logo from '../assets/img/logo.png';
import '../assets/css/toolbar.css';


function WinToolbar() {
  return (
    <ThemeProvider theme={original}>
      <AppBar className='toolbarposition'>
        <Toolbar>
          <div>
            <Button style={{ fontWeight: 'bold' }}>
              <img src={logo} alt="logo papua" style={{height: '30px', marginRight: '10px'}}/>
              Start</Button>
          </div>
        </Toolbar>
        
      </AppBar>
    </ThemeProvider>
  );
}

export default WinToolbar;