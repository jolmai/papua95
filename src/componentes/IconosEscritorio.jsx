import React, { useState } from 'react';
import { Frame, Tooltip, Window, WindowContent, WindowHeader, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import MiPC from '../assets/img/iconos/mipc.ico';
import Papelera from '../assets/img/iconos/papelera.ico';
import Carpeta from '../assets/img/iconos/carpeta.ico';
import '../assets/css/icon.css';
import Icono from './Iconos.jsx';
import VentanaPapelera from './VentanaPapelera.jsx';

function IconosEscritorio() {

    const[ventanaAbierta, eligeVentanaAbierta] = useState(null);
    const [carpetaAbierta, eligeCarpetaAbierta] = useState(null);

    const cogerClickIcono = (idIcono) => {
        if (idIcono === 'funda')
        {
            eligeCarpetaAbierta('funda');
        }
        else {
            eligeVentanaAbierta(idIcono);
        }       
    };

    const cerrarVentana = () => {
        eligeVentanaAbierta(null);
        eligeCarpetaAbierta(null);
    };

    return(
        <ThemeProvider theme={original}>
            <div className='containerIconos'>
                <Icono icono={MiPC} alter={'icono-mipc'} nombre={'Mi Pc'} idIcono={'mipc'} onClick={cogerClickIcono}/>
                <Icono icono={Papelera} alter={'icono-papelera'} nombre={'Papelera'} idIcono={'papelera'} onClick={cogerClickIcono}/>
                <Icono icono={Carpeta} alter={'icono-carpeta'} nombre={'La funda'} idIcono={'funda'} onClick={cogerClickIcono}/>
            </div>
            {ventanaAbierta === 'papelera' && <VentanaPapelera onClose={cerrarVentana} />}
            {carpetaAbierta === 'funda' && (
                <Window resizable className='ventanaCompleta'>
                    <WindowHeader className='barraVentana'>
                        <p>La Funda</p>
                        <Button onClick={cerrarVentana}>
                            <span style={{ fontWeight: 'bold' }}>X</span>
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                        <p>Contenido de La Funda...</p>
                    </WindowContent>
                </Window>
            )}
        </ThemeProvider>
    );
}

export default IconosEscritorio;