import React, { useState } from 'react';
import { Frame, Tooltip, Window, WindowContent, WindowHeader, Button } from 'react95';
import MiPC from '../assets/img/iconos/mipc.ico';
import Papelera from '../assets/img/iconos/papelera.ico';
import Carpeta from '../assets/img/iconos/carpeta.ico';
import '../assets/css/icon.css';

function Iconos ({icono, alter, nombre, idIcono, onClick}) {
    return(
        <Tooltip style={{backgroundColor: 'white'}} text={nombre} enterDelay={100} leaveDelay={100} position='bottom'>
        <Frame className='icono' onClick={() => onClick(idIcono)}>
            <img src={icono} alt={alter} style={{width: '50px'}}/>
            <p className='nombreIcono'>{nombre}</p>
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
        <>
            <div className='containerIconos'>
                <Iconos icono={MiPC} alter={'icono-mipc'} nombre={'Mi Pc'} idIcono={'mipc'} onClick={cogerClickIcono}/>
                <Iconos icono={Papelera} alter={'icono-papelera'} nombre={'Papelera'} idIcono={'papelera'} onClick={cogerClickIcono}/>
                <Iconos icono={Carpeta} alter={'icono-carpeta'} nombre={'La funda'} idIcono={'funda'} onClick={cogerClickIcono}/>
            </div>

            {ventanaAbierta === 'mipc' && (
                <Window resizable className='ventanaCompleta'> 
                    <WindowHeader className='barraVentana'>
                        <p>Mi PC</p>
                        <Button onClick={cerrarVentana} style={{ marginLeft: 'auto' }}>X</Button>
                    </WindowHeader>
                    <WindowContent style={{backgroundColor: 'white'}}>
                        <p>Papua manda</p>
                    </WindowContent>
                    
                </Window>
            )}
            {ventanaAbierta === 'papelera' && (
                <Window resizable className='ventanaCompleta'> 
                    <WindowHeader className='barraVentana'>
                        <p>Papelera</p>
                        <Button onClick={cerrarVentana}>X</Button>
                    </WindowHeader>
                    <WindowContent style={{backgroundColor: 'white'}}>
                        <p>papelera</p>
                    </WindowContent>    
                </Window>
            )}
        </>
    );
}

export default IconosEscritorio;