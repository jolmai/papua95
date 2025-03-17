import React from "react";
import { Window, WindowContent, WindowHeader, Frame, Button, MenuList, MenuListItem} from 'react95';
import moverVentana from '../js/moverVentana.js';
import ejecutar from '../../assets/img/iconos/run.ico';
import ventana from '../../assets/img/iconos/window.png';

function Ventana ({ titulo, onClose, children, style, onClick}) {

    const initialPosition = {
        x: style?.left ? parseInt(style.left) : 0,
        y: style?.top ? parseInt(style.top) : 0
    };

    const { position, handleMouseDown } = moverVentana(initialPosition);

    const handleClose = (e) => {
        e.stopPropagation();
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
                <div style={{display:'flex', alignItems:'center'}}>
                    <img src={ejecutar} alt="" />
                    <p style={{marginLeft:'10px'}}>{titulo}</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <Button onClick={handleClose}>
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
