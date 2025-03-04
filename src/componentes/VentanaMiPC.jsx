import React from "react";
import Ventana from "./Ventana";

function VentanaMiPC({onClose, posicion}){
    return(
        <Ventana titulo='MiPC' onClose={onClose}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`, // Posición X
            top: `${posicion.y}px`, // Posición Y
        }}
        >
            <p>Mipc bebe</p>
        </Ventana>
    );
    
}

export default VentanaMiPC;