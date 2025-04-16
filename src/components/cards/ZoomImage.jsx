import { Card, CardHeader } from "@mui/material";
import React, { useRef, useState } from "react";

// Componente principal que permite hacer zoom sobre una imagen al mover el cursor sobre ella
const ZoomImage = ({alt,src}) => {
  
  // Estado para controlar la visibilidad del zoom
  const [display, setDisplay] = useState("none");
  
  // Referencia al contenedor principal de la imagen
  const divRef = useRef();

  // Estado para almacenar las coordenadas del puntero del mouse
  const [pointer, setPointer] = useState({
  x: 0,
  y: 0,
  });

  // Función que se ejecuta al mover el mouse sobre la imagen
  // Calcula las coordenadas del puntero y actualiza el estado
  const onMouseMove = (event) => {
  if (!divRef.current) return;
  const { offsetWidth, offsetHeight } = divRef.current;
  setDisplay("block");
  let pointer = {
    x: (event.nativeEvent.offsetX * 100) / offsetWidth,
    y: (event.nativeEvent.offsetY * 100) / offsetHeight,
  };
  setPointer(pointer);
  };

  // Función que se ejecuta cuando el mouse sale del área de la imagen
  // Restaura el estado inicial
  const onMouseLeave = () => {
  setDisplay("none");
  setPointer({ x: 0, y: 0 });
  };

  return (
  <>
    {/* Contenedor principal que maneja los eventos de movimiento y salida del mouse */}
    <div
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    ref={divRef}
    className="zoom"
    style={{
      "--url": `url(${src})`,
      "--display": display,
      "--zoom-x": `${pointer.x}%`,
      "--zoom-y": `${pointer.y}%`,
      maxWidth: "600px",
      maxHeight: "600px",
      display:'flex',
      justifyContent:'center',
    }}
    >
    {/* Imagen que se muestra dentro del contenedor */}
    <img src={src} alt={alt}  width={'400px'} style={{borderRadius:'10px', objectFit:'contain'}} height={'400px'}/>
    </div>
  </>
  );
};

export default ZoomImage;
