import { Avatar, Box, Button, Chip, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markNotificationAsReadById } from "../../store";
import { getTimeFromNow } from "../../helpers/hoursDate";

// Estilo personalizado para el componente de notificación
const NotificationItem = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

// Componente NotiCard que representa una tarjeta de notificación
const NotiCard = ({ notification }) => {
  // Desestructuración de las propiedades de la notificación
  const { message, type, resource_id, readed, status, channel, createdAt } = notification;

  // Hook para la navegación
  const navigate = useNavigate();

  // Hook para despachar acciones de Redux
  const dispatch = useDispatch();

  // Función para marcar una notificación como leída
  const handleNotificationAsRead = (id) => {
    dispatch(markNotificationAsReadById(id));
  };

  return (
    <NotificationItem>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Avatar comentado, se puede habilitar si es necesario */}
        {/* <Avatar src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-02-24%20a%20la(s)%2010.48.00%E2%80%AFa.m.-JeNrH94RY3ztakXurKxzE2G3wbnC8X.png" /> */}
        <Box sx={{ flex: 1 }}>
          {/* Mensaje de la notificación */}
          <Typography sx={{ fontWeight: 500 }}>{message ?? ""}</Typography>
          {/* Tiempo transcurrido desde la creación de la notificación */}
          <Typography
            variant="body2"
            sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 2 }}
          >
            {getTimeFromNow(createdAt)}            
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Botón para marcar la notificación como leída si no lo está */}
            {!readed && (
              <Button
                onClick={() => handleNotificationAsRead(notification?._id)}
                variant="contained"
                color="primary"
                size="small"
                sx={{ textTransform: "inherit" }}
              >
                Marcar como leída
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </NotificationItem>
  );
};

// Exportación del componente NotiCard
export default NotiCard;
