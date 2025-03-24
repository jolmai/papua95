import React, {useState, useEffect, useRef} from 'react';
import { Button, AppBar, Toolbar, MenuList, MenuListItem, Separator, Tooltip} from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import logo from '../../assets/img/logo.png';
import libro from '../../assets/img/iconos/book.ico';
import configuracion from '../../assets/img/iconos/Settings.ico';
import programas from '../../assets/img/iconos/programs.ico';
import apagar from '../../assets/img/iconos/off.ico';
import documentos from '../../assets/img/iconos/web-documents.ico';
import find from '../../assets/img/iconos/find.ico';
import ejecutar from '../../assets/img/iconos/run.ico';
import '../../assets/css/toolbar.css';
import TiempoActual from '../Utiles/TiempoActual.jsx'
import PropTypes from 'prop-types';
import Buscador from '../Utiles/Buscador.jsx';

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
  const [windows, setWindows] = useState([]);
  const menuRef = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    if (windows.length === 0) {
      setWindows(ventanasAbiertas);
    } else {
      const updatedWindows = windows.filter(w => 
        ventanasAbiertas.some(v => v.id === w.id)
      ).map(window => {
        const updated = ventanasAbiertas.find(v => v.id === window.id);
        return updated || window;
      });

      const existingIds = new Set(updatedWindows.map(w => w.id));
      const newWindows = ventanasAbiertas.filter(w => !existingIds.has(w.id));
      
      if (newWindows.length > 0 || updatedWindows.length !== windows.length) {
        setWindows([...updatedWindows, ...newWindows]);
      }
    }
  }, [ventanasAbiertas]);

  const handleDragStart = (e, position) => {
    dragItem.current = position;
    e.target.style.opacity = '0.5';
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    const copyListItems = [...windows];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setWindows(copyListItems);
  };

  const cerrarVentana = () => {
    window.close();
  };

  const abrirCarpeta = () => {
    // Implementation can be added here if needed
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
      {showSearch && <Buscador 
        onClose={() => setShowSearch(false)} 
        eligeVentanaAbierta={window.eligeVentanaAbierta}
      />}
      <AppBar className='toolbarposition'>
        <Toolbar className='toolbarFlex'>
          <div ref={menuRef} className='toolbarFlex'>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
            >
              <img src={logo} alt="logo papua" style={{height: '25px', marginRight: '10px'}}/>
              Inicio
            </Button>
            <Separator orientation='vertical' size='33px' style={{ marginLeft: '5px', marginRight: '5px' }}/>
            {windows.map((ventana, index) => (
              <div
                key={ventana.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <Tooltip text={ventana.nombre} enterDelay={100} leaveDelay={100}>
                  <Button
                    style={{ 
                      overflowX: 'hidden',
                      overflowY: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => onFocusVentana(ventana.id)}
                  >
                    <img src={ventana.icono} alt={ventana.tipo} style={{ height: '20px' }} />
                    <span style={{ marginLeft: '10px' }}>{ventana.nombre}</span>
                  </Button>
                </Tooltip>
              </div>
            ))}
            {open && (
              
              <MenuList className='listaMenu' onClick={() => setOpen(false)}>
                <div style={{backgroundColor: 'gray', display:'flex', paddingBottom:'12px'}}>
                  <div className='nombreMenu'>
                    <h2>PAPUA<span>95</span></h2>
                  </div>
                </div>
                <div>
                  <MenuItem 
                    icono={programas} 
                    alter={'icono-programas'} 
                    texto='Programas' 
                    onClick={abrirCarpeta}
                  />
                  <MenuItem 
                    icono={documentos} 
                    alter={'icono-documentos'} 
                    texto='Documentos' 
                    onClick={abrirCarpeta}
                  />
                  <MenuItem 
                    icono={configuracion} 
                    alter={'icono-configuracion'} 
                    texto='Configuración' 
                  />
                  <MenuItem 
                    icono={find} 
                    alter={'icono-buscar'} 
                    texto='Buscar' 
                    onClick={abrirBuscador}
                  />
                  <MenuItem 
                    icono={libro} 
                    alter={'icono-ayuda'} 
                    texto='Ayuda' 
                  />
                  <MenuItem 
                    icono={ejecutar} 
                    alter={'icono-ejecutar'} 
                    texto='Ejecutar...' 
                  />
                  <Separator />
                  <MenuItem 
                    icono={apagar} 
                    alter={'icono-apagar'} 
                    texto='Apagar' 
                    onClick={cerrarVentana}
                  />
                </div>
                
              </MenuList>
            )}
          </div>
          <Tooltip text='Hora local (CET)' enterDelay={100} leaveDelay={100}>
            <TiempoActual />
          </Tooltip> 
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

WinToolbar.propTypes = {
  ventanasAbiertas: PropTypes.array.isRequired,
  onFocusVentana: PropTypes.func.isRequired,
  eligeVentanaAbierta: PropTypes.func.isRequired,
};

export default WinToolbar;
