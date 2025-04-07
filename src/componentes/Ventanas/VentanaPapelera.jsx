import React, { useState } from "react";
import Ventana from "../Utiles/Ventana";
import Notepad from '../../assets/img/iconos/Notepad.ico';
import Icono from "../Utiles/Iconos";
import Papelera from '../../assets/img/iconos/papelera.ico';
import VentanaNotePad from './VentanaNotePad';

function VentanaPapelera({onClose, posicion, isFocused, onClick}){
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);
    const [notepadPosition, setNotepadPosition] = useState({ x: 100, y: 100 });
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleNotepadOpen = () => {
        setIsNotepadOpen(true);
        setNotepadPosition({
            x: posicion.x + 50,
            y: posicion.y + 50
        });
    };

    const handleIconClick = (e) => {
        setSelectedIcon('notepad');
    };

    return(
        <>
            <Ventana 
                titulo='Papelera' 
                onClose={onClose} 
                tipoVentana="papelera" 
                iconHeader={Papelera}
                style={{ 
                    position: 'absolute',
                    left: `${posicion.x}px`,
                    top: `${posicion.y}px`,
                    zIndex: isFocused ? 1000 : 1,
                }}
                onClick={onClick}
            >
                <Icono 
                    icono={Notepad} 
                    alter={'icono-notepad'} 
                    nombre={'Papua Casino'} 
                    idIcono={'papelera'} 
                    estaDentroCarpeta={true}
                    onClick={handleIconClick}
                    onDoubleClick={handleNotepadOpen}
                    isSelected={selectedIcon === 'notepad'}
                />
            </Ventana>
            {isNotepadOpen && (
                <VentanaNotePad
                    onClose={() => setIsNotepadOpen(false)}
                    posicion={notepadPosition}
                    isFocused={true}
                    onClick={() => {}}
                />
            )}
        </>
    );
}

export default VentanaPapelera;
