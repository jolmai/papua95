import React from "react";
import Ventana from "../Utiles/Ventana";
import Drive from '../../assets/img/iconos/drive.ico';
import Disco from '../../assets/img/iconos/Disc Drive.ico';
import ControlPanel from '../../assets/img/iconos/Controls Folder.ico';
import Icono from "../Utiles/Iconos";

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
            <Icono icono={Drive} alter={'icono-drive'} nombre={'(C:)'} idIcono={'mipc'} estaDentroCarpeta={true}/>
            <Icono icono={Disco} alter={'icono-drive'} nombre={'(D:)'} idIcono={'mipc'} estaDentroCarpeta={true}/>
            <Icono icono={ControlPanel} alter={'icono-controlpanel'} nombre={'Panel Control'} idIcono={'mipc'} estaDentroCarpeta={true}/>
        </Ventana>
    );
    
}

export default VentanaMiPC;