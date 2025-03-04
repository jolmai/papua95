import React from "react";
import { Window, WindowContent, WindowHeader, Button } from 'react95';
import Iconos from "./Iconos.jsx";
import Juegos from "./Juegos.js";

function Funda({eligeVentanaAbierta, onClose}){
    return(
        <Window resizable className='ventanaCompleta'>
            <WindowHeader className='barraVentana'>
                <p>La Funda</p>
                <Button onClick={onClose}>
                    <span style={{ fontWeight: 'bold' }}>X</span>
                </Button>
            </WindowHeader>
            <WindowContent>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {Juegos.map((juego) => (
                    <Iconos key={juego.id} icono={juego.icono} alter={`icono-${juego.id}`} nombre={juego.nombre} idIcono={juego.id} onClick={(id) => eligeVentanaAbierta(id)} />
                ))}
            </div>
                
            </WindowContent>
        </Window>
    );
}

export default Funda;