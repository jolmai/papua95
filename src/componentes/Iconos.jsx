import React from "react";
import { Frame, Tooltip } from 'react95';

function Iconos ({icono, alter, nombre, idIcono, onClick, estaDentroCarpeta}) {
    return(
        <Tooltip style={{backgroundColor: 'white'}} text={nombre} enterDelay={100} leaveDelay={100} position='bottom'>
        <Frame variant="well" className='icono' onClick={() => onClick(idIcono)}>
            <img src={icono} alt={alter} style={{width: '50px'}}/>
            <p className='nombreIcono' style={{ color: estaDentroCarpeta ? 'black' : 'white' }}>{nombre}</p>
        </Frame>
        </Tooltip>
    );
}

export default Iconos;