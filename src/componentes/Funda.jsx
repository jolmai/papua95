import React from "react";
import Ventana from "./Ventana.jsx";
import Iconos from "./Iconos.jsx";
import Juegos from "./Juegos.js";

function Funda({onClose, eligeVentanaAbierta, onClick, isFocused, posicion}) {
    return(
        <Ventana titulo='La Funda' onClose={onClose} 
            style={{
                position: 'absolute',
                left: `${posicion.x}px`,
                top: `${posicion.y}px`,
                zIndex: isFocused ? 1000 : 1 }}  onClick={onClick} 
            >
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                {Juegos.map((juego) => (
                    <Iconos key={juego.id}
                            icono={juego.icono}
                            alter={`icono-${juego.id}`} 
                            nombre={juego.nombre} 
                            idIcono={juego.id} 
                            onClick={() => eligeVentanaAbierta(juego.id, 'juego')}
                            estaDentroCarpeta={true}/>
                ))}
            </div>
        </Ventana>
    );
}

export default Funda;