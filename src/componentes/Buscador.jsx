import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, TextField } from 'react95';
import PropTypes from 'prop-types';

function Buscador({ onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999
    }}>
      <Window className='window'>
        <WindowHeader className='window-header'>
          <span>Buscar</span>
          <Button onClick={onClose} style={{ position: 'absolute', right: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>X</span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <div style={{ display: 'flex', gap: '8px' }}>
            <TextField
              placeholder='Buscar...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
            <Button onClick={() => console.log('Searching:', searchQuery)}>
              Buscar
            </Button>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}

Buscador.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Buscador; 