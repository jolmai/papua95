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

    const [ventanaAbierta, eligeVentanaAbierta] = useState([]);
    const [carpetaAbierta, eligeCarpetaAbierta] = useState(null);

    const abrirVentana = (id, tipo) => {
        const nuevaVentana = {
            id: `${tipo}-${Date.now()}`,
            tipo,
            idJuego: id,
            posicion: { x: Math.random() * 200, y: Math.random() * 200 }, 
        };
        eligeVentanaAbierta([...ventanaAbierta, nuevaVentana]);
    };

    const cerrarVentana = (id) => {
        eligeVentanaAbierta(ventanaAbierta.filter((ventana) => ventana.id !== id));
    };

    const cogerClickIcono = (idIcono) => {
        if (idIcono === 'funda') {
            eligeCarpetaAbierta('funda');
        } else {
            abrirVentana(idIcono, idIcono);
        }
    };
   
    const cerrarCarpeta = () => {
        eligeCarpetaAbierta(null);
    };

    return(
        <ThemeProvider theme={original}>
            <div className='containerIconos'>
                <Icono icono={MiPC} alter={'icono-mipc'} nombre={'Mi Pc'} idIcono={'mipc'} onClick={cogerClickIcono}/>
                <Icono icono={Papelera} alter={'icono-papelera'} nombre={'Papelera'} idIcono={'papelera'} onClick={cogerClickIcono}/>
                <Icono icono={Carpeta} alter={'icono-carpeta'} nombre={'La funda'} idIcono={'funda'} onClick={cogerClickIcono}/>
            </div>
            
            {carpetaAbierta === 'funda' && <Funda eligeVentanaAbierta={abrirVentana} onClose={cerrarCarpeta} /> }
            {ventanaAbierta.map((ventana) => {
            if (ventana.tipo === 'mipc') {
                return (
                    <VentanaMiPC
                        key={ventana.id}
                        onClose={() => cerrarVentana(ventana.id)}
                        posicion={ventana.posicion} // Pasa la posición
                    />
                );
            } else if (ventana.tipo === 'papelera') {
                return (
                    <VentanaPapelera
                        key={ventana.id}
                        onClose={() => cerrarVentana(ventana.id)}
                        posicion={ventana.posicion} // Pasa la posición
                    />
                );
            } else if (ventana.tipo === 'juego') {
                return (
                    <VentanaJuego
                        key={ventana.id}
                        idJuego={ventana.idJuego}
                        onClose={() => cerrarVentana(ventana.id)}
                        posicion={ventana.posicion} // Pasa la posición
                    />
                );
            }
            return null;
        })}
        </ThemeProvider>
    );
}

export default IconosEscritorio;