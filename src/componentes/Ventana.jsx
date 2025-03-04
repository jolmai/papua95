import React  from "react";
import { Window, WindowContent, WindowHeader, Frame, Button} from 'react95';

function Ventana ({ titulo, onClose, children, style}) {
    return(
        <Window className='ventanaCompleta' style={style}> 
        <WindowHeader className='barraVentana'>
            <p>{titulo}</p>
            <Button onClick={onClose}>
                <span style={{ fontWeight: 'bold' }}>X</span>
            </Button>
        </WindowHeader>
        <WindowContent style={{height: '100%', padding: '0'}}>
            <Frame variant='field' style={{height: '100%', width: '100%', padding: '0'}}>
                {children}
            </Frame>
        </WindowContent>
    </Window>
    );
}

export default Ventana;
