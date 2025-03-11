import React from "react";
import Ventana from "../Utiles/Ventana";

function VentanaPapelera({onClose, posicion, isFocused, onClick}){
    return(
        <Ventana titulo='Papelera' onClose={onClose}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}
        >
            <p>Papeleron bbbe</p>
        </Ventana>
    );
}
export default VentanaPapelera;
