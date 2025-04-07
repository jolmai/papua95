import React, { useState, useRef } from 'react';
import Ventana from "../Utiles/Ventana";
import Notepad from '../../assets/img/iconos/Notepad.ico';
import { Frame } from 'react95';

function VentanaNotePad({ onClose, posicion, isFocused, onClick }) {
    const [text, setText] = useState('');
    const textAreaRef = useRef(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(textAreaRef.current.value);
    };

    const handleCut = () => {
        navigator.clipboard.writeText(textAreaRef.current.value);
        setText('');
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(prevText => prevText + clipboardText);
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };

    const handleSave = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notepad.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleOpen = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setText(e.target.result);
            reader.readAsText(file);
        }
    };

    return (
        <Ventana
            titulo="Bloc de notas"
            onClose={onClose}
            tipoVentana="notepad"
            iconHeader={Notepad}
            style={{
                position: 'absolute',
                left: `${posicion.x}px`,
                top: `${posicion.y}px`,
                zIndex: isFocused ? 1000 : 1,
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={onClick}
            dimensiones={{ width: 600, height: 400 }}
        >
            <input
                id="file-input"
                type="file"
                accept=".txt"
                onChange={handleOpen}
                style={{ display: 'none' }}
            />
            <Frame 
                variant="field" 
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    margin: 0
                }}
                >
                <textarea
                    ref={textAreaRef}
                    value={text}
                    onChange={handleTextChange}
                    style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    resize: 'none',
                    border: 'none',
                    padding: '8px',
                    fontFamily: 'Consolas, monospace',
                    fontSize: '14px',
                    lineHeight: 1.4,
                    outline: 'none',
                    backgroundColor: 'white',
                    whiteSpace: 'pre-wrap',
                    }}
                    spellCheck="false"
                />
            </Frame>
        </Ventana>
    );
}

export default VentanaNotePad; 

//no uses el frame que tiene ventana, crea un nuevo que sea solo para esta ventana de notepad, crealo en utiles