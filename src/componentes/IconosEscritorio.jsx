import React, { useState } from 'react';
import { Frame, Tooltip } from 'react95';
import MiPC from '../assets/img/iconos/mipc.ico';
import Papelera from '../assets/img/iconos/papelera.ico';
import Carpeta from '../assets/img/iconos/carpeta.ico';
import '../assets/css/icon.css';

function Iconos ({icono, alter, nombre, idIcono}) {
    return(
        <Tooltip style={{backgroundColor: 'white'}} text={nombre} enterDelay={100} leaveDelay={100} position='bottom'>
        <Frame className='icono' onClick={() => eligeVentanaAbierta({idIcono})}>
            <img src={icono} alt={alter} style={{width: '50px'}}/>
            <p>{nombre}</p>
        </Frame>
        </Tooltip>
    );
}

function IconosEscritorio() {

    const[ventanaAbierta, eligeVentanaAbierta] = useState(null);

    const cogerClickIcono = (ventana) => {
        eligeVentanaAbierta(ventana);
    };

    const cerrarVentana = () => {
        eligeVentanaAbierta(null);
    };

    return(
        <div className='containerIconos'>
            <Iconos icono={MiPC} alter={'icono-mipc'} nombre={'Mi Pc'} idIcono={'mipc'} />
            <Iconos icono={Papelera} alter={'icono-papelera'} nombre={'Papelera'} idIcono={'papelera'} />
            <Iconos icono={Carpeta} alter={'icono-carpeta'} nombre={'La funda'} idIcono={'funda'} />
        </div>
    );
}

export default IconosEscritorio;