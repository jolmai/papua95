import React, {useState, useEffect, useRef} from 'react';
import { Button, AppBar, Toolbar, MenuList, MenuListItem, Separator, Tooltip} from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import logo from '../assets/img/logo.png';
import libro from '../assets/img/iconos/book.ico';
import configuracion from '../assets/img/iconos/Settings.ico';
import programas from '../assets/img/iconos/programs.ico';
import apagar from '../assets/img/iconos/off.ico';
import documentos from '../assets/img/iconos/web-documents.ico';
import find from '../assets/img/iconos/find.ico';
import ejecutar from '../assets/img/iconos/run.ico';
import '../assets/css/toolbar.css';
import TiempoActual from './TiempoActual.jsx'
import PropTypes from 'prop-types';
import Buscador from './Buscador.jsx';

function MenuItem({icono, alter, texto, onClick}) {
  return (
    <MenuListItem className='itemMenu' onClick={onClick}>
      <div className='itemFlex'>
        <img src={icono} alt={alter} style={{height: '30px', marginRight: '10px'}}/>
        {texto}
      </div>
    </MenuListItem>
  )
}

MenuItem.propTypes = {
  icono: PropTypes.string.isRequired,
  alter: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

function WinToolbar({ ventanasAbiertas, onFocusVentana }) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const menuRef = useRef(null);

  const cerrarVentana = () => {
    window.close();
  };

  const abrirCarpeta = () => {

  };

  const abrirBuscador = () => {
    setShowSearch(true);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ThemeProvider theme={original}>
      {showSearch && <Buscador onClose={() => setShowSearch(false)} />}
      <AppBar className='toolbarposition'>
        <Toolbar className='toolbarFlex'>
          <div ref={menuRef}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
            >
              <img src={logo} alt="logo papua" style={{height: '25px', marginRight: '10px'}}/>
              Inicio
            </Button>
            {open && (
              <MenuList className='listaMenu' onClick={() => setOpen(false)}>
                <MenuItem 
                  icono={programas} 
                  alt={'icono-programas'} 
                  texto='Programas' 
                  onClick={abrirCarpeta}
                />
                <MenuItem 
                  icono={documentos} 
                  alt={'icono-documentos'} 
                  texto='Documentos' 
                  onClick={abrirCarpeta}
                />
                <MenuItem 
                  icono={configuracion} 
                  alt={'icono-configuracion'} 
                  texto='Configuración' 
                />
                <MenuItem 
                  icono={find} 
                  alt={'icono-buscar'} 
                  texto='Buscar' 
                  onClick={abrirBuscador}
                />
                <MenuItem 
                  icono={libro} 
                  alt={'icono-ayuda'} 
                  texto='Ayuda' 
                />
                <MenuItem 
                  icono={ejecutar} 
                  alt={'icono-ejecutar'} 
                  texto='Ejecutar...' 
                />
                <Separator />
                <MenuItem 
                  icono={apagar} 
                  alt={'icono-apagar'} 
                  texto='Apagar' 
                  onClick={cerrarVentana}
                />
              </MenuList>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              {ventanasAbiertas.map((ventana) => (
                  <Tooltip key={ventana.id} text={ventana.nombre} enterDelay={100} leaveDelay={100}>
                      <Button onClick={() => onFocusVentana(ventana.id)}>
                          <img src={ventana.icono} alt={ventana.tipo} style={{ height: '20px' }} />
                      </Button>
                  </Tooltip>
              ))}
          </div>

          <Tooltip text= 'Hora local (CET)' enterDelay={100} leaveDelay={100}>
            <TiempoActual />
          </Tooltip> 
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

WinToolbar.propTypes = {
  ventanasAbiertas: PropTypes.array.isRequired,
  onFocusVentana: PropTypes.func.isRequired
};

export default WinToolbar;