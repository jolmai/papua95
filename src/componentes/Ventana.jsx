import React from "react";
import { Window, WindowContent, WindowHeader, Frame, Button} from 'react95';
import moverVentana from './moverVentana.js';

function Ventana ({ titulo, onClose, children, style, onClick}) {
    // Initialize position with the style coordinates
    const initialPosition = {
        x: style?.left ? parseInt(style.left) : 0,
        y: style?.top ? parseInt(style.top) : 0
    };

    const { position, handleMouseDown } = moverVentana(initialPosition);

    const handleClose = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        onClose();
    };

    return(
        <Window className='ventanaCompleta' 
            style={{
                ...style,
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: style.zIndex
            }}
            onClick={onClick}
        > 
            <WindowHeader className='barraVentana' onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
                <p>{titulo}</p>
                <Button onClick={handleClose}>
                    <span style={{ fontWeight: 'bold' }}>X</span>
                </Button>
            </WindowHeader>
            <WindowContent style={{height: '85%', padding: '10px'}}>
                <Frame variant='field' style={{height: '100%', width: '100%', padding: '10px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        {children}
                    </div>
                </Frame>
            </WindowContent>
        </Window>
    );
}

export default Ventana;
