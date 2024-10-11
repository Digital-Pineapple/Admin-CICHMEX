import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Icono de Material-UI
import styled from 'styled-components';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Definir el botón flotante de WhatsApp usando Styled Components
const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #25D366; /* Color de WhatsApp */
  color: white;
  width: ${(props) => (props.isMobile ? '50px' : '70px')}; /* Tamaño basado en la pantalla */
  height: ${(props) => (props.isMobile ? '50px' : '70px')}; /* Tamaño basado en la pantalla */
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  
  &:hover {
    background-color: #128C7E; /* Color más oscuro en hover */
    transform: scale(1.1); /* Animación en hover */
  }
`;

// Definir el contenedor del mini chat (modal)
const ChatContainer = styled(Paper)`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1100;
`;

const FavWhatsapp = ({ phoneNumber, message }) => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para abrir/cerrar el mini chat
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta si la pantalla es pequeña

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || '')}`; // URL de WhatsApp con mensaje predefinido

  // Función para alternar el mini chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <StyledFab isMobile={isMobile} onClick={toggleChat} aria-label="Abrir chat de WhatsApp">
        <WhatsAppIcon fontSize="large" />
      </StyledFab>

      {/* Mini chat que se abre cuando se hace clic en el botón */}
      {isChatOpen && (
        <ChatContainer>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Chat con nosotros</Typography>
            <IconButton size="small" onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2">
            Hola, ¿en qué podemos ayudarte? Inicia una conversación con nosotros a través de WhatsApp.
          </Typography>
          <Box mt={2} textAlign="center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Fab color="primary" variant="extended" size="small">
                <WhatsAppIcon />
                Iniciar Chat
              </Fab>
            </a>
          </Box>
        </ChatContainer>
      )}
    </>
  );
};

export default FavWhatsapp;

