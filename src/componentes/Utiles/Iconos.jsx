import React, { forwardRef } from "react";
import { Frame, Tooltip } from 'react95';

const Iconos = forwardRef(({icono, alter, nombre, idIcono, onClick, estaDentroCarpeta, isSelected}, ref) => {
    return(
        <div 
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                onClick(e);
            }}
            className={`icon-container ${isSelected ? 'selected' : ''}`}
        >
            <Tooltip style={{backgroundColor: 'white'}} text={nombre} enterDelay={100} leaveDelay={100} position='bottom'>
                <Frame 
                    variant="well" 
                    className={`icono ${isSelected ? 'selected' : ''}`} 
                    style={{
                        backgroundColor: isSelected ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
                        border: isSelected ? '1px dotted #000' : 'none'
                    }}
                >
                    <img 
                        src={icono} 
                        alt={alter} 
                        style={{
                            width: '50px',
                        }}
                    />
                    <p 
                        className='nombreIcono' 
                        style={{ 
                            color: isSelected ? 'white' : (estaDentroCarpeta ? 'black' : 'white'),
                            backgroundColor: isSelected ? 'rgb(0, 0, 255)' : 'transparent'
                        }}
                    >
                        {nombre}
                    </p>
                </Frame>
            </Tooltip>
        </div>
    );
});

export default Iconos;