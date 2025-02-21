import React from 'react';
import { Button, AppBar, Toolbar } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';



function WinToolbar() {
  return (
    <ThemeProvider theme={original}>
      <div style={{ height: '100vh', padding: '1rem' }}>     
        <AppBar style={{ position: 'static', marginBottom: '1rem' }}>
          <Toolbar>
            <div>
              <Button>Start</Button>
              <Button active>Active</Button>
            </div>
            
          </Toolbar>
        </AppBar>
        <Button>Click me!</Button>
      </div>
    </ThemeProvider>
  );
}

export default WinToolbar;