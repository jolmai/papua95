import React from "react";
import Ventana from "./Ventana";

function VentanaPapelera({onClose, posicion}){
    return(
        <Ventana titulo='Papelera' onClose={onClose}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`, // Posición X
            top: `${posicion.y}px`, // Posición Y
        }}
        >
            <p>Papeleron bbbe</p>
        </Ventana>
    );
}
export default VentanaPapelera;
