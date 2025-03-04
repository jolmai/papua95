import React from "react";
import Ventana from "./Ventana";

function VentanaMiPC({onClose}){
    return(
        <Ventana titulo='MiPC' onClose={onClose}>
            <p>Mipc bebe</p>
        </Ventana>
    );
    
}

export default VentanaMiPC;