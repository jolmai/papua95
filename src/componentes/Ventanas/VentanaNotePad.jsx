import React, { useState, useRef } from 'react';
import Notepad from '../../assets/img/iconos/Notepad.ico';
import { Window, WindowContent, WindowHeader, Button, MenuList, MenuListItem, Frame, TextInput } from 'react95';
import moverVentana from '../js/moverVentana.js';
import ventana from '../../assets/img/iconos/window.png';
import ejecutar from '../../assets/img/iconos/run.ico';

function VentanaNotePad({ onClose, posicion, isFocused, onClick }) {
    const [text, setText] = useState('');
    const textAreaRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousDimensions, setPreviousDimensions] = useState(null);

    const defaultDimensions = { width: 600, height: 400 };
    const finalDimensions = isMaximized ? 
        { width: window.innerWidth, height: window.innerHeight - 50 } : // 50px for toolbar
        defaultDimensions;

    const headerHeight = 50;
    const menuHeight = 30;
    const contentHeight = finalDimensions.height - headerHeight - menuHeight;

    const initialPosition = {
        x: posicion?.x || 0,
        y: posicion?.y || 0
    };

    const { position, handleMouseDown } = moverVentana(initialPosition);

    const handleClose = (e) => {
        e.stopPropagation();
        onClose();
    };

    const handleMaximize = (e) => {
        e.stopPropagation();
        if (!isMaximized) {
            setPreviousDimensions({
                width: finalDimensions.width,
                height: finalDimensions.height,
                x: position.x,
                y: position.y
            });
        }
        setIsMaximized(!isMaximized);
    };

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
        <Window className='ventanaCompleta' 
            style={{
                position: 'absolute',
                left: isMaximized ? 0 : `${position.x}px`,
                top: isMaximized ? 0 : `${position.y}px`,
                zIndex: isFocused ? 1000 : 1,
                width: finalDimensions.width,
                height: finalDimensions.height,
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={onClick}
        > 
            <WindowHeader 
                className='barraVentana' 
                onMouseDown={!isMaximized ? handleMouseDown : undefined} 
                style={{ cursor: isMaximized ? 'default' : 'move' }}
            >
                <div style={{display:'flex', alignItems:'center'}}>
                    <img src={Notepad} alt="" style={{width:'25px'}}/>
                    <p style={{marginLeft:'10px'}}>Bloc de notas</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <Button onClick={handleMaximize}>
                        <img src={ventana} alt="icono-ventana" style={{width:'30px'}} />
                    </Button>
                    <Button onClick={handleClose}>
                        <span style={{ fontWeight: 'bold' }}>X</span>
                    </Button>
                </div>
            </WindowHeader>
            <MenuList className="menuHeader" inline>
                <MenuListItem size='sm'>Archivo</MenuListItem>
                <MenuListItem size='sm'>Editar</MenuListItem>
                <MenuListItem size='sm'>Vista</MenuListItem>
            </MenuList>
            <WindowContent className="contentContent">
                <Frame 
                    variant='inside' 
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
                        rows={15}
                        fullWidth
                        style={{
                            height: '100%',
                            fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            resize: 'none'
                        }}
                    />
                </Frame>
            </WindowContent>
        </Window>
    );
}

export default VentanaNotePad;

//no uses el frame que tiene ventana, crea un nuevo que sea solo para esta ventana de notepad, crealo en utiles