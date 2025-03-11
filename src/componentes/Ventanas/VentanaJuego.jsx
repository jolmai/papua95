import React from "react";
import Ventana from "../Utiles/Ventana.jsx";
import  Juegos  from '../js/Juegos.js';

function VentanaJuego({idJuego, onClose, posicion, isFocused, onClick}) {
    const juego = Juegos.find((juego) => juego.id === idJuego);
    if(!juego) return null;

    return(
        <Ventana titulo={juego.nombre} onClose={onClose} 
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            minHeight: '500px',
            padding: '0',
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}>
            <iframe
                src={juego.iframeSrc}
                title={juego.nombre}
                allow='autoplay; fullscreen'
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    backgroundColor: '#000',
                    minHeight: '400px',
                }}
            />
        </Ventana>
    );

}

export default VentanaJuego;