import React from "react";
import Ventana from "./Ventana";

function VentanaPapelera({onClose}){
    return(
        <Ventana titulo='Papelera' onClose={onClose}>
            <p>Papeleron bbbe</p>
        </Ventana>
    );
}
export default VentanaPapelera;
