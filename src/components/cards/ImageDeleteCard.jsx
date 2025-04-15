import { Avatar, Badge, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import styled from "styled-components";

// Componente estilizado para personalizar el Badge de Material-UI
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 19, // Ajusta la posición horizontal del badge
    top: 18,  // Ajusta la posición vertical del badge
  },
}));

// Componente funcional que representa una tarjeta con una imagen y un botón para eliminar
// Props:
// - src: URL de la imagen que se mostrará en el Avatar
// - handleDelete: función que se ejecutará al hacer clic en el botón de eliminar
const ImageDeleteCard = ({ src, handleDelete = () => null }) => {
  return (
    <StyledBadge
      badgeContent={
        <IconButton
          sx={{ backgroundColor: "black", color: "black" }}
          onClick={handleDelete} // Llama a la función handleDelete al hacer clic
        >          
          <DeleteIcon sx={{ color: "white", fontSize: "20px" }} />{" "}
        </IconButton>
      }
    >
      <Avatar
        src={src} // Muestra la imagen proporcionada en el prop src
        variant="square" // Define la forma del Avatar como cuadrada
        sx={{ width: "100%", height: "100px" }} // Establece el tamaño del Avatar
      />
    </StyledBadge>
  );
};

export default ImageDeleteCard; // Exporta el componente para su uso en otros archivos
