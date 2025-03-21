import React, { useState } from "react";
import { Window, WindowContent, WindowHeader, Frame, Button, MenuList, MenuListItem} from 'react95';
import moverVentana from '../js/moverVentana.js';
import ejecutar from '../../assets/img/iconos/run.ico';
import ventana from '../../assets/img/iconos/window.png';
import dimensionVentana from '../js/dimensionesVentana.js';

function Ventana ({ titulo, onClose, children, style, onClick, tipoVentana, dimensiones, iconHeader}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousDimensions, setPreviousDimensions] = useState(null);

    const externalDimensions = tipoVentana ? dimensionVentana[tipoVentana] : {}
    const defaultDimensions = {width:400 , height: 400};
    const finalDimensions = isMaximized ? 
        { width: window.innerWidth, height: window.innerHeight - 50 } : // 50px for toolbar
        {...defaultDimensions,...externalDimensions, ...dimensiones};

    const headerHeight = 50;
    const menuHeight = 30;
    const contentHeight = finalDimensions.height - headerHeight - menuHeight;

    const initialPosition = {
        x: style?.left ? parseInt(style.left) : 0,
        y: style?.top ? parseInt(style.top) : 0
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

    return(
        <Window className='ventanaCompleta' 
            style={{
                ...style,
                ...finalDimensions,
                position: 'absolute',
                left: isMaximized ? 0 : `${position.x}px`,
                top: isMaximized ? 0 : `${position.y}px`,
                zIndex: style.zIndex
            }}
            onClick={onClick}
        > 
            <WindowHeader 
                className='barraVentana' 
                onMouseDown={!isMaximized ? handleMouseDown : undefined} 
                style={{ cursor: isMaximized ? 'default' : 'move' }}
            >
                <div style={{display:'flex', alignItems:'center'}}>
                    <img src={ iconHeader || ejecutar} alt="" style={{width:'25px'}}/>
                    <p style={{marginLeft:'10px'}}>{titulo}</p>
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
                <Frame variant='field' style={{height: `${contentHeight}px`, width: '100%'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        {children}
                    </div>
                </Frame>
            </WindowContent>
        </Window>
    );
}

export default Ventana;
