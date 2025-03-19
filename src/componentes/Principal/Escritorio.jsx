import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import MiPC from '../../assets/img/iconos/mipc.ico';
import Papelera from '../../assets/img/iconos/papelera.ico';
import Carpeta from '../../assets/img/iconos/carpeta.ico';
import '../../assets/css/icon.css';
import Icono from '../Utiles/Iconos.jsx';
import Funda from '../Ventanas/Funda.jsx';
import VentanaPapelera from '../Ventanas/VentanaPapelera.jsx';
import VentanaMiPC from '../Ventanas/VentanaMiPC.jsx';
import VentanaJuego from '../Ventanas/VentanaJuego.jsx';
import WinToolbar from './WinToolbar.jsx';
import juegos from '../js/Juegos.js';

function Escritorio() {
    const [ventanaAbierta, eligeVentanaAbierta] = useState([]);
    const [selectedIcons, setSelectedIcons] = useState(new Set());
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
    const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
    const desktopRef = useRef(null);
    const lastClickTime = useRef(0);
    const iconRefs = useRef(new Map());

    const abrirVentana = (id, tipo) => {
        const ventanaExistente = ventanaAbierta.find((ventana) => ventana.tipo === tipo);

        if (ventanaExistente) {
            const nuevasVentanas = ventanaAbierta.filter((ventana) => ventana.id !== ventanaExistente.id);
            nuevasVentanas.push(ventanaExistente); 
            eligeVentanaAbierta(nuevasVentanas);
            return; 
        }
     
        let nombre = '';
        let icono = '';

        if (tipo === 'juego') {
            const juego = juegos.find((juego) => juego.id === id);
            nombre = juego.nombre;
            icono = juego.icono;
        } else {
            nombre = tipo === 'mipc' ? 'Mi PC' : tipo === 'papelera' ? 'Papelera' : tipo === 'funda' ? 'La funda' : 'Juego';
            icono = tipo === 'mipc' ? MiPC : tipo === 'papelera' ? Papelera : tipo === 'funda' ? Carpeta : '';
        }
        const nuevaVentana = {
            id: `${tipo}-${Date.now()}`,
            tipo,
            idJuego: id,
            nombre,
            posicion: { x: Math.random() * (window.innerWidth * 0.3), y: Math.random() * (window.innerHeight * 0.3) }, 
            icono,
        };
        eligeVentanaAbierta([...ventanaAbierta, nuevaVentana]);
    };

    const cerrarVentana = (id) => {
        eligeVentanaAbierta(ventanaAbierta.filter((ventana) => ventana.id !== id));
    };

    const cogerClickIcono = (idIcono) => {
        let tipo;
        switch(idIcono) {
            case 'mipc': 
                tipo = 'mipc';
                break;
            case 'papelera': 
                tipo = 'papelera';
                break;
            case 'funda': 
                tipo = 'funda';
                break;
            default:
                tipo = 'juego';
        }
        abrirVentana(idIcono, tipo);
    };

    const focusVentana = (id) => {
        const ventana = ventanaAbierta.find((v) => v.id === id);
        if (ventana) {
            const nuevasVentanas = ventanaAbierta.filter((v) => v.id !== id);
            nuevasVentanas.push(ventana);
            eligeVentanaAbierta(nuevasVentanas);
        }
    };

    const handleIconClick = (idIcono, event) => {
        event.stopPropagation();
        
        if (event.ctrlKey) {
            // Toggle selection with Ctrl key
            setSelectedIcons(prev => {
                const newSelection = new Set(prev);
                if (newSelection.has(idIcono)) {
                    newSelection.delete(idIcono);
                } else {
                    newSelection.add(idIcono);
                }
                return newSelection;
            });
        } else {
            const now = Date.now();
            if (now - lastClickTime.current < 500 && selectedIcons.has(idIcono)) {
                // Double click detected
                cogerClickIcono(idIcono);
            } else {
                // Single click - select only this icon
                setSelectedIcons(new Set([idIcono]));
            }
            lastClickTime.current = now;
        }
    };

    const handleDesktopMouseDown = (event) => {
        // Only start selection if clicking directly on the desktop or containerIconos
        if (event.target === desktopRef.current || event.target.className === 'containerIconos') {
            setIsSelecting(true);
            const rect = desktopRef.current.getBoundingClientRect();
            setSelectionStart({ 
                x: event.clientX - rect.left, 
                y: event.clientY - rect.top 
            });
            setSelectionEnd({ 
                x: event.clientX - rect.left, 
                y: event.clientY - rect.top 
            });
            setSelectedIcons(new Set());
        }
    };

    const handleDesktopMouseMove = (event) => {
        if (isSelecting) {
            const rect = desktopRef.current.getBoundingClientRect();
            setSelectionEnd({ 
                x: event.clientX - rect.left, 
                y: event.clientY - rect.top 
            });
            
            // Calculate selection box coordinates
            const selectionBox = {
                left: Math.min(selectionStart.x, event.clientX - rect.left),
                right: Math.max(selectionStart.x, event.clientX - rect.left),
                top: Math.min(selectionStart.y, event.clientY - rect.top),
                bottom: Math.max(selectionStart.y, event.clientY - rect.top)
            };

            // Check which icons are within the selection box
            const selectedIconIds = new Set();
            iconRefs.current.forEach((iconElement, iconId) => {
                if (iconElement) {
                    const iconRect = iconElement.getBoundingClientRect();
                    const iconRelativePos = {
                        left: iconRect.left - rect.left,
                        right: iconRect.right - rect.left,
                        top: iconRect.top - rect.top,
                        bottom: iconRect.bottom - rect.top
                    };

                    if (
                        iconRelativePos.left < selectionBox.right &&
                        iconRelativePos.right > selectionBox.left &&
                        iconRelativePos.top < selectionBox.bottom &&
                        iconRelativePos.bottom > selectionBox.top
                    ) {
                        selectedIconIds.add(iconId);
                    }
                }
            });
            setSelectedIcons(selectedIconIds);
        }
    };

    const handleDesktopMouseUp = () => {
        setIsSelecting(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && selectedIcons.size === 1) {
            const [selectedIcon] = Array.from(selectedIcons);
            cogerClickIcono(selectedIcon);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIcons]);

    useEffect(() => {
        window.eligeVentanaAbierta = abrirVentana;
        
        return () => {
            delete window.eligeVentanaAbierta;
        };
    }, [ventanaAbierta]);

    return(
        <ThemeProvider theme={original}>
            <div 
                ref={desktopRef}
                className='desktop'
                onMouseDown={handleDesktopMouseDown}
                onMouseMove={handleDesktopMouseMove}
                onMouseUp={handleDesktopMouseUp}
                style={{ width: '100vw', height: '100vh', position: 'relative' }}
            >
                <div 
                    className='containerIconos'
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none' // This allows clicks to pass through to the desktop
                    }}
                >
                    {/* Make the icons have pointer-events: auto to still be clickable */}
                    <div style={{ pointerEvents: 'auto' }}>
                        <Icono 
                            ref={(el) => {
                                if (el) iconRefs.current.set('mipc', el);
                                else iconRefs.current.delete('mipc');
                            }}
                            icono={MiPC} 
                            alter={'icono-mipc'} 
                            nombre={'Mi Pc'} 
                            idIcono={'mipc'} 
                            onClick={(e) => handleIconClick('mipc', e)}
                            isSelected={selectedIcons.has('mipc')}
                        />
                        <Icono 
                            ref={(el) => {
                                if (el) iconRefs.current.set('papelera', el);
                                else iconRefs.current.delete('papelera');
                            }}
                            icono={Papelera} 
                            alter={'icono-papelera'} 
                            nombre={'Papelera'} 
                            idIcono={'papelera'} 
                            onClick={(e) => handleIconClick('papelera', e)}
                            isSelected={selectedIcons.has('papelera')}
                        />
                        <Icono 
                            ref={(el) => {
                                if (el) iconRefs.current.set('funda', el);
                                else iconRefs.current.delete('funda');
                            }}
                            icono={Carpeta} 
                            alter={'icono-carpeta'} 
                            nombre={'La funda'} 
                            idIcono={'funda'} 
                            onClick={(e) => handleIconClick('funda', e)}
                            isSelected={selectedIcons.has('funda')}
                        />
                    </div>
                </div>
                
                {isSelecting && (
                    <div
                        style={{
                            position: 'absolute',
                            left: Math.min(selectionStart.x, selectionEnd.x),
                            top: Math.min(selectionStart.y, selectionEnd.y),
                            width: Math.abs(selectionEnd.x - selectionStart.x),
                            height: Math.abs(selectionEnd.y - selectionStart.y),
                            border: '1px dotted #000',
                            backgroundColor: 'rgba(0, 0, 255, 0.1)',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    />
                )}

                {ventanaAbierta.map((ventana) => {
                    if (ventana.tipo === 'mipc') {
                        return (
                            <VentanaMiPC key={ventana.id} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                        );
                    } else if (ventana.tipo === 'papelera') {
                        return (
                            <VentanaPapelera key={ventana.id} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                        );
                    } else if (ventana.tipo === 'funda') {
                        return (
                            <Funda key={ventana.id} eligeVentanaAbierta={(id, tipo) => abrirVentana(id, tipo)} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} onClick={() => focusVentana(ventana.id)}/>
                        );
                    } else if (ventana.tipo === 'juego') {
                        return (
                            <VentanaJuego key={ventana.id} idJuego={ventana.idJuego} onClose={() => cerrarVentana(ventana.id)} posicion={ventana.posicion} isFocused={ventanaAbierta[ventanaAbierta.length - 1].id === ventana.id} onClick={() => focusVentana(ventana.id)}/>
                        );
                    }
                    return null;
                })}
                <WinToolbar ventanasAbiertas={ventanaAbierta} onFocusVentana={(id) => focusVentana(id)} />
            </div>
        </ThemeProvider>
    );
}

export default Escritorio;
