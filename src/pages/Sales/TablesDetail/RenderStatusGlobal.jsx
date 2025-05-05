import { Chip, Avatar, Box, Typography } from "@mui/material";
import { MoreHoriz, Check, LocalShipping, Home, Cancel } from "@mui/icons-material";
import { purple, green, grey, red, blue } from "@mui/material/colors";

// Función principal que renderiza un componente Chip basado en order_status (número)
const renderStatusGlobal = (order_status) => {
  const statusMap = {
    0: {
      label: "Pendiente de pago",
      sx: {
        backgroundColor: grey[200],
        color: "#000",
        fontWeight: "bold",
      },
      icon: <MoreHoriz sx={{ color: "#000" }} />,
    },
    1: {
      label: "Verificar pago",
      sx: {
        backgroundColor: purple[200],
        color: "#000",
        fontWeight: "bold",
      },
      avatar: (
        <Avatar sx={{ backgroundColor: purple[500] }}>
          <Typography variant="body2" color="#fff">P</Typography>
        </Avatar>
      ),
    },
    2: {
      label: "Preparar orden",
      sx: {
        backgroundColor: blue[100],
        color: "#000",
        fontWeight: "bold",
      },
      icon: <MoreHoriz sx={{ color: "#000" }} />,
    },
    3: {
      label: "Surtido en almacén",
      sx: {
        backgroundColor: green[100],
        color: green[800],
        fontWeight: "bold",
      },
      icon: <Check sx={{ color: green[800] }} />,
    },
    4: {
      label: "Cargado por transportista",
      sx: {
        backgroundColor: blue[100],
        color: blue[900],
        fontWeight: "bold",
      },
      icon: <LocalShipping sx={{ color: blue[900] }} />,
    },
    5: {
      label: "Enviado a punto de entrega",
      sx: {
        backgroundColor: "#ffe082",
        color: "#5d4037",
        fontWeight: "bold",
      },
      icon: <LocalShipping />,
    },
    6: {
      label: "En punto de entrega",
      sx: {
        backgroundColor: "#fff176",
        color: "#5d4037",
        fontWeight: "bold",
      },
      icon: <LocalShipping />,
    },
    7: {
      label: "Enviado a domicilio",
      sx: {
        backgroundColor: "#b3e5fc",
        color: "#0277bd",
        fontWeight: "bold",
      },
      icon: <Home />,
    },
    8: {
      label: "Entregado",
      sx: {
        backgroundColor: green[100],
        color: green[900],
        fontWeight: "bold",
      },
      icon: <Check sx={{ color: green[900] }} />,
    },
    9: {
      label: "Cancelado",
      variant: "outlined",
      sx: { fontWeight: "bold", color: red[700], borderColor: red[300] },
      icon: <Cancel sx={{ color: red[700] }} />,
    },
  };

  if (!(order_status in statusMap)) return null;

  return <Chip size="small" {...statusMap[order_status]} />;
};

export default renderStatusGlobal;
