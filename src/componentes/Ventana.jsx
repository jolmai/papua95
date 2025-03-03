import React  from "react";
import { Window, WindowContent, WindowHeader, Frame, Button} from 'react95';

function Ventana ({ titulo, onClose, children}) {
    return(
        <Window resizable className='ventanaCompleta'> 
        <WindowHeader className='barraVentana'>
            <p>{titulo}</p>
            <Button onClick={onClose}>
                <span style={{ fontWeight: 'bold' }}>X</span>
            </Button>
        </WindowHeader>
        <WindowContent>
            <Frame variant='field' style={{height: '100%', width: '100%'}}>
                {children}
            </Frame>
        </WindowContent>
    </Window>
    );
}

export default Ventana;
