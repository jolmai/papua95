import React from "react";
import Ventana from "./Ventana";
import { Juegos } from './Juegos';

function VentanaJuego({idJuego, onClose}) {
    const juego = Juegos.find((juego) => juego.id === idJuego);
    if(!juego) return null;

    return(
        <Ventana titulo={juego.nombre} onClose={onClose}>
            <iframe
                src='{juego.iframeSrc}'
                title='{juego.nombre}'
                allow='autoplay; fullscreen'
            />
        </Ventana>
    );

}

export default VentanaJuego;