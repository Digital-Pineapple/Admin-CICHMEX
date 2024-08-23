import { Card, CardHeader } from "@mui/material";
import React, { useRef, useState } from "react";

const ZoomImage = ({ src, alt }) => {
  
  const [display, setDisplay] = useState("none");
  const divRef = useRef();

  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });
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

  const onMouseLeave = () => {
    setDisplay("none");
    setPointer({ x: 0, y: 0 });
  };
  return (
    <>
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
          maxWidth: "500px",
        }}
      >
        <img src={src} alt={alt} />
      </div>
    </>
  );
};

export default ZoomImage;
