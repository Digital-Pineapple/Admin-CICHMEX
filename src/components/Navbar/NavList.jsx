import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom
} from "@mui/material";
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

import { NavLink } from "react-router-dom";

// Componente que renderiza una lista de navegación dentro de un Drawer
function NavListDrawer({ navArrayLinks }) {
  return (
    <>
      <List>
        {/* Elemento de lista para el enlace "Home" */}
        <ListItem sx={{ display: "block" }} disablePadding>
          {/* Enlace de navegación a la ruta "/auth/home" */}
          <NavLink to={"/auth/home"} style={{ color: "white", textDecoration: 'none' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                backgroundColor: "inherit",
                "&:hover": {
                  backgroundColor: "#95C8FF", // Cambia el color de fondo al pasar el mouse
                },
                px: 3,
              }}
            >
              {/* Ícono de la casa para el enlace "Home" */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "GrayText",
                }}
              >
                <CottageOutlinedIcon />
              </ListItemIcon>
              {/* Texto del enlace "Home" */}
              <ListItemText sx={{ color: "white", textUnderlineOffset: "" }}>
                Home
              </ListItemText>
            </ListItemButton>
          </NavLink>
        </ListItem>
        {/* Línea divisoria entre el enlace "Home" y los demás enlaces */}
        <Divider />
        {/* Mapeo de los enlaces dinámicos proporcionados en el array "navArrayLinks" */}
        {navArrayLinks.map((item) => (
          <ListItem sx={{ display: "block" }} disablePadding key={item.title}>
            {/* Tooltip que muestra el título del enlace al pasar el mouse */}
            <Tooltip TransitionComponent={Zoom} placement="right" arrow title={item.title}>
              {/* Enlace de navegación dinámico */}
              <NavLink to={item.path} style={{ color: "white", textDecoration: 'none' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    backgroundColor: "inherit",
                    "&:hover": {
                      backgroundColor: "#95C8FF", // Cambia el color de fondo al pasar el mouse
                    },
                    px: 3,
                  }}
                >
                  {/* Ícono dinámico del enlace */}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#3877FF", // Color del ícono
                    }}
                  >
                    {item.Icon}
                  </ListItemIcon>
                  {/* Texto dinámico del enlace */}
                  <ListItemText sx={{ color: "white", textUnderlineOffset: "" }}>
                    {item.title}
                  </ListItemText>
                </ListItemButton>
              </NavLink>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default NavListDrawer;
