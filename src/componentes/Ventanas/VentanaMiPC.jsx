import React from "react";
import Ventana from "../Utiles/Ventana";

function VentanaMiPC({onClose, posicion, isFocused, onClick}){
    return(
        <Ventana titulo='MiPC' onClose={onClose}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}
        >
            <p>Mipc bebe</p>
        </Ventana>
    );
    
}

export default VentanaMiPC;