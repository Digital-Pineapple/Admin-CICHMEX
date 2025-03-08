import { Chip, Avatar, Box, Typography } from "@mui/material";
import { MoreHoriz, Check } from "@mui/icons-material";
import { purple } from "@mui/material/colors";

const renderStatus = (status) => {
  const statusMap = {
    pending: {
      label: "Pendiente",
      sx: {
        backgroundColor: "#fff", // Fondo blanco
        color: "#000", // Texto negro
        border: "1px solid rgba(182,182,182,0.49)",
        fontWeight: "bold",
      },
      icon: (
        <MoreHoriz
          sx={{
            color: "#000", // Ícono negro
            backgroundColor: "info.main", // Fondo según tema 'info'
            borderRadius: "50%",
          }}
        />
      ),
    },
    cancelled: {
      label: "Cancelado o rechazado",
      variant: "outlined",
      sx: { fontWeight: "bold" },
      avatar: (
        <Avatar
          sx={{
            backgroundColor: "error.main",
            borderRadius: "50%",
          }}
        >
          <Typography variant="body1" color="#fff">
            x
          </Typography>
        </Avatar>
      ),
    },
    pending_to_verify: {
      label: "Pendiente de verificar",
      variant: "outlined",
      sx: { fontWeight: "bold" },
      avatar: (
        <Avatar
          sx={{
            backgroundColor: purple[400],
            borderRadius: "50%",
          }}
        >
          <Typography variant="body1" color="#fff">
            p
          </Typography>
        </Avatar>
      ),
    },
    approved: {
      label: "Pagado",
      variant: "outlined",
      sx: { fontWeight: "bold" },
      icon: (
        <Box
          sx={{
            backgroundColor: "success.main",
            color: "#fff",
            borderRadius: "50%",
            width: 15,
            height: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check sx={{ fontSize: 18, color: "#fff" }} />
        </Box>
      ),
    },
  };

  if (!statusMap[status]) return null;
  return <Chip size="small" {...statusMap[status]} />;
};

export default renderStatus;
