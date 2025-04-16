import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function MenuDrawerSmall() {
  // Estado local para controlar la apertura y cierre del Drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  // Función para alternar la visibilidad del Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    // Evita que se active en eventos de teclado específicos
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
    }
  
    // Actualiza el estado para abrir o cerrar el Drawer
    setState({ ...state, [anchor]: open });
  };
  
  // Función que genera la lista de elementos dentro del Drawer
  const list = (anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)} // Cierra el Drawer al hacer clic
    onKeyDown={toggleDrawer(anchor, false)} // Cierra el Drawer al presionar una tecla
    >
    <List>
      {/* Genera una lista de elementos con íconos */}
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
        <ListItemIcon>
          {/* Alterna entre dos íconos según el índice */}
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      ))}
    </List>
    <Divider /> {/* Línea divisoria entre listas */}
    <List>
      {/* Genera otra lista de elementos con íconos */}
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
        <ListItemIcon>
          {/* Alterna entre dos íconos según el índice */}
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)} // Cierra el Drawer al hacer clic
    onKeyDown={toggleDrawer(anchor, false)} // Cierra el Drawer al presionar una tecla
    >
    <List>
      {/* Genera una lista de elementos con íconos */}
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
        <ListItemIcon>
          {/* Alterna entre dos íconos según el índice */}
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      ))}
    </List>
    <Divider /> {/* Línea divisoria entre listas */}
    <List>
      {/* Genera otra lista de elementos con íconos */}
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
        <ListItemIcon>
          {/* Alterna entre dos íconos según el índice */}
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      ))}
    </List>
    </Box>
  );
}
