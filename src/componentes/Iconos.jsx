import React from "react";
import { Frame, Tooltip } from 'react95';

function Iconos ({icono, alter, nombre, idIcono, onClick}) {
    return(
        <Tooltip style={{backgroundColor: 'white'}} text={nombre} enterDelay={100} leaveDelay={100} position='bottom'>
        <Frame variant="well" className='icono' onClick={() => onClick(idIcono)}>
            <img src={icono} alt={alter} style={{width: '50px'}}/>
            <p className='nombreIcono'>{nombre}</p>
        </Frame>
        </Tooltip>
    );
}

export default Iconos;