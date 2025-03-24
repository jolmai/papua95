import React from "react";
import Ventana from "../Utiles/Ventana.jsx";
import  Juegos  from '../js/Juegos.js';

function VentanaJuego({idJuego, onClose, posicion, isFocused, onClick}) {
    const juego = Juegos.find((juego) => juego.id === idJuego);
    if(!juego) return null;

    return(
        <Ventana titulo={juego.nombre} onClose={onClose} iconHeader={juego.icono} tipoVentana={juego.id}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
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
                    display: 'block',
                    position: 'absolute', 
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            />
        </Ventana>
    );

}

export default VentanaJuego;