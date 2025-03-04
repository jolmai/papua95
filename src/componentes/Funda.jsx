import React from "react";
import Ventana from "./Ventana.jsx";
import Iconos from "./Iconos.jsx";
import Juegos from "./Juegos.js";

function Funda({onClose, eligeVentanaAbierta}){
    return(
        <Ventana titulo='La Funda' onClose={onClose}>
            <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                {Juegos.map((juego) => (
                    <Iconos key={juego.id}
                            icono={juego.icono}
                            alter={`icono-${juego.id}`} 
                            nombre={juego.nombre} 
                            idIcono={juego.id} 
                            onClick={(id) => eligeVentanaAbierta(id, 'juego')} 
                            estaDentroCarpeta={true}/>
                ))}
            </div>
        </Ventana>
    );
}

export default Funda;