import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAuthStore } from "../../hooks";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom"; // Importa useLocation para obtener la ruta actual

const drawerWidth = 240;

// Componente Accordion personalizado con estilos
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  backgroundColor: `${theme.palette.primary.main}`, // Fondo del acordeón
  color: `${theme.palette.primary.contrastText}`, // Color del texto
}));

// Componente AccordionSummary personalizado con estilos
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "primary.contrastText" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse", // Cambia la dirección del contenido
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)", // Rotación del ícono al expandir
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1), // Espaciado del contenido
  },
}));

// Componente AccordionDetails personalizado con estilos
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(245, 9, 9, 0.22)", // Borde superior
}));

// Componente principal del menú lateral
const MenuDrawer = ({ navLinks }) => {
  const { navigate } = useAuthStore(); // Hook para manejar la navegación
  const [expanded, setExpanded] = useState(""); // Estado para controlar qué acordeón está expandido
  const location = useLocation(); // Obtiene la ruta actual

  // Maneja el cambio de expansión de los acordeones
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Maneja la navegación al hacer clic en un elemento
  const handleNavigateClick = (value) => {
    navigate(value, { replace: true });
  };

  return (
    <Box sx={{ width: drawerWidth }}>
      {/* Itera sobre los grupos de enlaces de navegación */}
      {navLinks.map((group, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`} // Determina si el acordeón está expandido
          onChange={handleChange(`panel${index}`)} // Maneja el cambio de expansión
        >
          <AccordionSummary
            expandIcon={
              <ArrowCircleRightOutlined
                sx={{ color: "primary.contrastText" }}
              />
            }
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <Typography>
              {/* Muestra el título del grupo */}
              {typeof group.title === "object"
                ? JSON.stringify(group.title)
                : group.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className="custom-scroll">
            {/* Itera sobre las subrutas del grupo */}
            {group.subRoutes.map((item, subIndex) => (
              <ListItem sx={{ width: "100%" }} key={subIndex} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigateClick(item.path)} // Navega a la ruta correspondiente
                  sx={{
                    borderRadius: "5px", // Bordes redondeados
                    margin: 1, // Margen entre elementos
                    bgcolor:
                      location.pathname === item.path
                        ? "success.main" // Color para la ruta activa
                        : "transparent", // Color para rutas inactivas
                    "&:hover": {
                      bgcolor: "primary.contrastTextSecond", // Color al pasar el mouse
                    },
                  }}
                >
                  <ListItemText primary={item.name} /> {/* Nombre del enlace */}
                </ListItemButton>
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MenuDrawer;
