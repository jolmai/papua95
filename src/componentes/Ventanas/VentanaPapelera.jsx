import React from "react";
import Ventana from "../Utiles/Ventana";
import Notepad from '../../assets/img/iconos/Notepad.ico';
import Icono from "../Utiles/Iconos";
import Papelera from '../../assets/img/iconos/papelera.ico';

function VentanaPapelera({onClose, posicion, isFocused, onClick}){
    return(
        <Ventana titulo='Papelera' onClose={onClose} tipoVentana="papelera" iconHeader={Papelera}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}
        >
            <Icono icono={Notepad} alter={'icono-notepad'} nombre={'Papua'} idIcono={'papelera'} estaDentroCarpeta={true}/>
        </Ventana>
    );
}
export default VentanaPapelera;
