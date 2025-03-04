import React from "react";
import Ventana from "./Ventana.jsx";
import  Juegos  from './Juegos.js';

function VentanaJuego({idJuego, onClose, posicion}) {
    const juego = Juegos.find((juego) => juego.id === idJuego);
    if(!juego) return null;

    return(
        <Ventana titulo={juego.nombre} onClose={onClose} 
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
        }}>
            <iframe
                src={juego.iframeSrc}
                title={juego.nombre}
                allow='autoplay; fullscreen'
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    backgroundColor: '#000'
                }}
            />
        </Ventana>
    );

}

export default VentanaJuego;