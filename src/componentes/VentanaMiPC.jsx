import React from "react";
import Ventana from "./Ventana";

function VentanaMiPC({onClose, posicion}){
    return(
        <Ventana titulo='MiPC' onClose={onClose}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
        }}
        >
            <p>Mipc bebe</p>
        </Ventana>
    );
    
}

export default VentanaMiPC;