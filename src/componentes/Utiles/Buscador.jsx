import React, { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button, TextField, List, ListItem } from 'react95';
import PropTypes from 'prop-types';
import Juegos from '../js/Juegos.js';
import MiPC from '../../assets/img/iconos/mipc.ico';
import Papelera from '../../assets/img/iconos/papelera.ico';
import Carpeta from '../../assets/img/iconos/carpeta.ico';

function Buscador({ onClose, eligeVentanaAbierta }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchableItems = [
    { id: 'mipc', name: 'Mi PC', icon: MiPC, type: 'mipc' },
    { id: 'papelera', name: 'Papelera', icon: Papelera, type: 'papelera' },
    { id: 'funda', name: 'La funda', icon: Carpeta, type: 'funda' },
    ...Juegos.map(juego => ({ id: juego.id, name: juego.nombre, icon: juego.icono, type: 'juego' }))
  ];

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Filter items based on the search query
    const results = searchableItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleItemClick = (item) => {
    // Open the selected item using the eligeVentanaAbierta function
    eligeVentanaAbierta(item.id, item.type);
    onClose(); // Close the search window after opening the item
  };

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
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <TextField
              placeholder='Buscar...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
            />
            <Button onClick={handleSearch}>
              Buscar
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <List>
                {searchResults.map((item) => (
                  <ListItem key={`${item.type}-${item.id}`} onClick={() => handleItemClick(item)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px' }} />
                      <span>{item.name}</span>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          )}
          
          {searchResults.length === 0 && searchQuery && (
            <div style={{ padding: '8px' }}>
              No se encontraron resultados.
            </div>
          )}
        </WindowContent>
      </Window>
    </div>
  );
}

Buscador.propTypes = {
  onClose: PropTypes.func.isRequired,
  eligeVentanaAbierta: PropTypes.func.isRequired
};

export default Buscador;
