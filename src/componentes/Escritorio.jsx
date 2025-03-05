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
import WinToolbar from './WinToolbar.jsx';

function IconosEscritorio() {

    const [ventanaAbierta, eligeVentanaAbierta] = useState([]);
    const [carpetaAbierta, eligeCarpetaAbierta] = useState(null);

    const abrirVentana = (id, tipo) => {
        const nuevaVentana = {
            id: `${tipo}-${Date.now()}`,
            tipo,
            idJuego: id,
            posicion: { x: Math.random() * (window.innerWidth - 300), y: Math.random() * (window.innerHeight - 200) }, 
            icono: tipo === 'mipc' ? MiPC : tipo === 'papelera' ? Papelera : Carpeta,
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

    const focusVentana = (id) => {
 
        const ventana = ventanaAbierta.find((v) => v.id === id);
        if (ventana) {
            const nuevasVentanas = ventanaAbierta.filter((v) => v.id !== id);
            nuevasVentanas.push(ventana);
            eligeVentanaAbierta(nuevasVentanas);
        }
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
                        posicion={ventana.posicion}
                        isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id}
                    />
                );
            } else if (ventana.tipo === 'papelera') {
                return (
                    <VentanaPapelera
                        key={ventana.id}
                        onClose={() => cerrarVentana(ventana.id)}
                        posicion={ventana.posicion}
                        isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id}
                    />
                );
            } else if (ventana.tipo === 'juego') {
                return (
                    <VentanaJuego
                        key={ventana.id}
                        idJuego={ventana.idJuego}
                        onClose={() => cerrarVentana(ventana.id)}
                        posicion={ventana.posicion} 
                        isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id}
                    />
                );
            }
            return null;
        })}
        <WinToolbar ventanasAbiertas={ventanaAbierta} onFocusVentana={focusVentana} />
        </ThemeProvider>
    );
}

export default IconosEscritorio;