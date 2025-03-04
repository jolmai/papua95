import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import MiPC from '../assets/img/iconos/mipc.ico';
import Papelera from '../assets/img/iconos/papelera.ico';
import Carpeta from '../assets/img/iconos/carpeta.ico';
import '../assets/css/icon.css';
import Icono from './Iconos.jsx';
import Funda from './Funda.jsx';
import VentanaPapelera from './VentanaPapelera.jsx';
import VentanaMiPC from './VentanaMiPC.jsx';
import VentanaJuego from './VentanaJuego.jsx';

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
            {ventanaAbierta === 'mipc' && <VentanaMiPC onClose={cerrarVentana} />}
            {carpetaAbierta === 'funda' && <Funda eligeVentanaAbierta={eligeVentanaAbierta} onClose={cerrarVentana} /> }

            {ventanaAbierta && ventanaAbierta !== 'papelera' && ventanaAbierta !== 'mipc' && (
                <VentanaJuego idJuego={ventanaAbierta} onClose={cerrarVentana}/>
            )}
        </ThemeProvider>
    );
}

export default IconosEscritorio;