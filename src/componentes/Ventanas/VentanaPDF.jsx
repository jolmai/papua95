import React from "react";
import Ventana from "../Utiles/Ventana";
import WordPad from '../../assets/img/iconos/WordPad.ico';



function VentanaPDF({onClose, posicion, isFocused, onClick, nombrePDF }) {
    

    return (
        <Ventana 
            titulo={"Presentación Papua"}
            onClose={onClose} 
            tipoVentana="presentacion"
            iconHeader={WordPad}
            style={{ 
                position: 'absolute',
                left: `${posicion.x}px`,
                top: `${posicion.y}px`,
                zIndex: isFocused ? 1000 : 1,
            }}
            onClick={onClick}
            dimensiones={{ width: 800, height: 600 }}
        >
           <div style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                backgroundColor: '#fff'
            }}>
                <iframe
                    src={`/presentacion/${nombrePDF}#page=fit`}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                    title="PDF Viewer"
                />
            </div>
        </Ventana>
    );
}

export default VentanaPDF;