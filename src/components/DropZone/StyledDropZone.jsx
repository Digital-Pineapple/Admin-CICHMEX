import { Avatar, Badge, Box, IconButton } from "@mui/material";
import Image from "mui-image";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

// Estilos base para el área de dropzone
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#bdbdbd",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

// Estilo cuando el área de dropzone está enfocada
const focusedStyle = {
  borderColor: "#2196f3",
};

// Estilo cuando se aceptan archivos
const acceptStyle = {
  borderColor: "#00e676",
};

// Estilo cuando se rechazan archivos
const rejectStyle = {
  borderColor: "#ff1744",
};

// Contenedor para las miniaturas de las imágenes
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

// Estilo para cada miniatura
const thumb = {
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
};

// Contenedor interno de cada miniatura
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

// Estilo para las imágenes dentro de las miniaturas
const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

// Componente estilizado para el badge (ícono de eliminar)
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 19,
    top: 18,
  },
}));

// Componente principal StyledDropzone
export default function StyledDropzone({ callback, files, onDelete = () => null }) {
  // Configuración del hook useDropzone
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        // Limita el número de archivos a 3
        if (files.length === 3) {
          return;
        }
        // Llama al callback con el archivo aceptado
        callback(acceptedFiles[0]);
      },
      maxFiles: 3, // Máximo de archivos permitidos
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  // Combina los estilos dinámicos según el estado del dropzone
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  // Genera las miniaturas de las imágenes cargadas
  const images = files.map((file) => (
    <StyledBadge
      badgeContent={
        <IconButton
          sx={{
            backgroundColor: "black",
            color: "black",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Evita que el evento se propague
            onDelete(file.id); // Llama a la función onDelete con el ID del archivo
          }}
        >
          <DeleteIcon sx={{ color: "white", fontSize: "20px" }} />
        </IconButton>
      }
    >
      <Avatar
        src={URL.createObjectURL(file.file)} // Genera una URL temporal para mostrar la imagen
        style={{ objectFit: "contain" }}
        variant="square"
        sx={{ width: "150px", height: "150px" }}
      />
    </StyledBadge>
  ));

  return (
    <div className="container">
      {/* Área de dropzone */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {/* Mensaje inicial si no hay archivos cargados */}
        {files.length === 0 && (
          <p>Arrastra la imagen aquí o haz click sobre el recuadro</p>
        )}
        {/* Contenedor de las imágenes cargadas */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {images}
        </div>
      </div>
    </div>
  );
}
