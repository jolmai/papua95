import React, { useState, useRef } from "react";
import Icono from "../Utiles/Iconos";
import Ventana from "../Utiles/Ventana";
import BlocDeNotas from '../../assets/img/iconos/Notepad.ico';
import { ScrollView, TextInput } from 'react95';

function VentanaBlocDeNotas({ onClose, posicion, isFocused, onClick }) {
    const [text, setText] = useState('');
    const [contentHeight, setContentHeight] = useState(400); // Default height
    const textAreaRef = useRef(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleOpen = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    return ( 
        <Ventana titulo='Bloc de notas' onClose={onClose} tipoVentana="BlocDeNotas" iconHeader={BlocDeNotas}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}
        > 
                <ScrollView 
                    style={{ 
                        height: `${contentHeight}px`,
                        width: '100%'
                    }}
                >
                    <input
                        id="file-input"
                        type="file"
                        accept=".txt"
                        onChange={handleOpen}
                        style={{ display: 'none' }}
                    />
                    <TextInput
                        ref={textAreaRef}
                        value={text}
                        onChange={handleTextChange}
                        multiline
                        variant='First'
                        rows={15}
                        fullWidth
                        
                    />
                </ScrollView>
        </Ventana>
    );
}

export default VentanaBlocDeNotas;
