import React, { useState, useEffect } from 'react';
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
import juegos from './Juegos.js';

function Escritorio() {
    const [ventanaAbierta, eligeVentanaAbierta] = useState([]);

    const abrirVentana = (id, tipo) => {
        const ventanaExistente = ventanaAbierta.find((ventana) => ventana.tipo === tipo);

        if (ventanaExistente) {
            const nuevasVentanas = ventanaAbierta.filter((ventana) => ventana.id !== ventanaExistente.id);
            nuevasVentanas.push(ventanaExistente); 
            eligeVentanaAbierta(nuevasVentanas);
            return; 
        }
     
        let nombre = '';
        let icono = '';

        if (tipo === 'juego') {
            const juego = juegos.find((juego) => juego.id === id);
            nombre = juego.nombre;
            icono = juego.icono;
        } else {
            nombre = tipo === 'mipc' ? 'Mi PC' : tipo === 'papelera' ? 'Papelera' : tipo === 'funda' ? 'La funda' : 'Juego';
            icono = tipo === 'mipc' ? MiPC : tipo === 'papelera' ? Papelera : tipo === 'funda' ? Carpeta : '';
        }
        const nuevaVentana = {
            id: `${tipo}-${Date.now()}`,
            tipo,
            idJuego: id,
            nombre,
            posicion: { x: Math.random() * (window.innerWidth * 0.3), y: Math.random() * (window.innerHeight * 0.3) }, 
            icono,
        };
        eligeVentanaAbierta([...ventanaAbierta, nuevaVentana]);
    };

    const cerrarVentana = (id) => {
        eligeVentanaAbierta(ventanaAbierta.filter((ventana) => ventana.id !== id));
    };

    const cogerClickIcono = (idIcono) => {
        let tipo;
        switch(idIcono) {
            case 'mipc': 
                tipo = 'mipc';
                break;
            case 'papelera': 
                tipo = 'papelera';
                break;
            case 'funda': 
                tipo = 'funda';
                break;
            default:
                tipo = 'juego';
        }
        abrirVentana(idIcono, tipo);
    };

    const focusVentana = (id) => {
        const ventana = ventanaAbierta.find((v) => v.id === id);
        if (ventana) {
            const nuevasVentanas = ventanaAbierta.filter((v) => v.id !== id);
            nuevasVentanas.push(ventana);
            eligeVentanaAbierta(nuevasVentanas);
        }
    };

    useEffect(() => {
        window.eligeVentanaAbierta = abrirVentana;
        
        return () => {
            delete window.eligeVentanaAbierta;
        };
    }, [ventanaAbierta]);

    return(
        <ThemeProvider theme={original}>
            <div className='containerIconos'>
                <Icono icono={MiPC} alter={'icono-mipc'} nombre={'Mi Pc'} idIcono={'mipc'} onClick={cogerClickIcono} />
                <Icono icono={Papelera} alter={'icono-papelera'} nombre={'Papelera'} idIcono={'papelera'} onClick={cogerClickIcono}/>
                <Icono icono={Carpeta} alter={'icono-carpeta'} nombre={'La funda'} idIcono={'funda'} onClick={cogerClickIcono} />
            </div>
            
            {ventanaAbierta.map((ventana) => {
                if (ventana.tipo === 'mipc') {
                    return (
                        <VentanaMiPC key={ventana.id} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                    );
                } else if (ventana.tipo === 'papelera') {
                    return (
                        <VentanaPapelera key={ventana.id} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                    );
                } else if (ventana.tipo === 'funda') {
                    return (
                        <Funda key={ventana.id} eligeVentanaAbierta={(id, tipo) => abrirVentana(id, tipo)} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} onClick={() => focusVentana(ventana.id)}/>
                    );
                } else if (ventana.tipo === 'juego') {
                    return (
                        <VentanaJuego key={ventana.id} idJuego={ventana.idJuego} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                    );
                }
                return null;
            })}
            <WinToolbar ventanasAbiertas={ventanaAbierta} onFocusVentana={(id) => focusVentana(id)} />
        </ThemeProvider>
    );
}

export default Escritorio;
