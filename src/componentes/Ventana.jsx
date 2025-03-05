import React  from "react";
import { Window, WindowContent, WindowHeader, Frame, Button} from 'react95';
import moverVentana from './moverVentana.js';

function Ventana ({ titulo, onClose, children, style}) {

    const { position, handleMouseDown } = moverVentana();
    return(
        <Window className='ventanaCompleta' style={{...style, position: 'absolute', left: `${position.x}px`, top: `${position.y}px`,}}> 
        <WindowHeader className='barraVentana' onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
            <p>{titulo}</p>
            <Button onClick={onClose}>
                <span style={{ fontWeight: 'bold' }}>X</span>
            </Button>
        </WindowHeader>
        <WindowContent style={{height: '40%', padding: '10px'}}>
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
