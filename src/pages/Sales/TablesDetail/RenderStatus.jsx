import { Chip, Avatar, Box, Typography } from "@mui/material";
import { MoreHoriz, Check } from "@mui/icons-material";
import { purple } from "@mui/material/colors";

// Función principal que renderiza un componente Chip basado en el estado proporcionado
const renderStatus = (status) => {
  // Mapeo de estados con sus respectivas configuraciones
  const statusMap = {
    pending: {
      label: "Pendiente", // Texto que se muestra en el Chip
      sx: {
        backgroundColor: "#fff", // Fondo blanco
        color: "#000", // Texto negro
        border: "1px solid rgba(182,182,182,0.49)", // Borde gris claro
        fontWeight: "bold", // Texto en negrita
      },
      icon: (
        <MoreHoriz
          sx={{
            color: "#000", // Ícono negro
            backgroundColor: "info.main", // Fondo según el tema 'info'
            borderRadius: "50%", // Forma circular
          }}
        />
      ),
    },
    cancelled: {
      label: "Cancelado o rechazado", // Texto que se muestra en el Chip
      variant: "outlined", // Variante del Chip (bordeado)
      sx: { fontWeight: "bold" }, // Texto en negrita
      avatar: (
        <Avatar
          sx={{
            backgroundColor: "error.main", // Fondo rojo (error)
            borderRadius: "50%", // Forma circular
          }}
        >
          <Typography variant="body1" color="#fff">
            x {/* Texto dentro del avatar */}
          </Typography>
        </Avatar>
      ),
    },
    pending_to_verify: {
      label: "Pendiente de verificar", // Texto que se muestra en el Chip
      variant: "outlined", // Variante del Chip (bordeado)
      sx: { fontWeight: "bold" }, // Texto en negrita
      avatar: (
        <Avatar
          sx={{
            backgroundColor: purple[400], // Fondo morado
            borderRadius: "50%", // Forma circular
          }}
        >
          <Typography variant="body1" color="#fff">
            p {/* Texto dentro del avatar */}
          </Typography>
        </Avatar>
      ),
    },
    approved: {
      label: "Pagado", // Texto que se muestra en el Chip
      variant: "outlined", // Variante del Chip (bordeado)
      sx: { fontWeight: "bold" }, // Texto en negrita
      icon: (
        <Box
          sx={{
            backgroundColor: "success.main", // Fondo verde (éxito)
            color: "#fff", // Texto blanco
            borderRadius: "50%", // Forma circular
            width: 15, // Ancho del ícono
            height: 15, // Altura del ícono
            display: "flex", // Flexbox para centrar el contenido
            alignItems: "center", // Centrado vertical
            justifyContent: "center", // Centrado horizontal
          }}
        >
          <Check sx={{ fontSize: 18, color: "#fff" }} /> {/* Ícono de check */}
        </Box>
      ),
    },
  };

  // Si el estado no existe en el mapeo, retorna null
  if (!statusMap[status]) return null;

  // Retorna un componente Chip con las configuraciones del estado correspondiente
  return <Chip size="small" {...statusMap[status]} />;
};

export default renderStatus; // Exporta la función para ser utilizada en otros archivos
