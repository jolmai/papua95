import React from "react";
import Icono from "../Utiles/Iconos";
import Ventana from "../Utiles/Ventana";
import BlocDeNotas from '../../assets/img/iconos/Notepad.ico';

function VentanaBlocDeNotas({ onClose, posicion, isFocused, onClick }) {
    return ( 
        <Ventana titulo='Bloc de notas' onClose={onClose} tipoVentana="BlocDeNotas" iconHeader={BlocDeNotas}
        style={{ 
            position: 'absolute',
            left: `${posicion.x}px`,
            top: `${posicion.y}px`,
            zIndex: isFocused ? 1000 : 1,
        }}
        onClick={onClick}
        > 
                <ScrollView 
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
                        variant='First'
                        rows={15}
                        fullWidth
                        
                    />
                </ScrollView>
        </Ventana>
    );
}

export default VentanaBlocDeNotas;
