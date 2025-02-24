import React, {useState} from 'react';
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

function MenuItem({icono, alter, texto}) {
  return (
    <MenuListItem className='itemMenu'>
      <div className='itemFlex'>
        <img src={icono} alt={alter} style={{height: '30px', marginRight: '10px'}}/>
        {texto}
      </div>
    </MenuListItem>
  )
}

function WinToolbar() {

  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={original}>
      <AppBar className='toolbarposition'>
        <Toolbar className='toolbarFlex'>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
            >
            <img src={logo} alt="logo papua" style={{height: '25px', marginRight: '10px'}}/>
            Inicio</Button>
            {open && (
              <MenuList className='listaMenu' onClick={() => setOpen(false)}>
                <MenuItem icono={programas} alt={'icono-programas'} texto='Programas' />
                <MenuItem icono={documentos} alt={'icono-documentos'} texto='Documentos' />
                <MenuItem icono={configuracion} alt={'icono-configuracion'} texto='Configuración' />
                <MenuItem icono={find} alt={'icono-buscar'} texto='Buscar' />
                <MenuItem icono={libro} alt={'icono-ayuda'} texto='Ayuda' />
                <MenuItem icono={ejecutar} alt={'icono-ejecutar'} texto='Ejecutar...' />
                <Separator />
                <MenuItem icono={apagar} alt={'icono-apagar'} texto='Apagar' />
              </MenuList>
            )}
            <Tooltip text= 'Hora local (CET)' enterDelay={100} leaveDelay={100}>
              <TiempoActual />
            </Tooltip> 
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default WinToolbar;