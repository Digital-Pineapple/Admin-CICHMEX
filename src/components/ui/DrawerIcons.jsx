import React,{ children } from 'react'

import { styled,useTheme,ThemeProvider,createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux';


// Ancho del drawer (barra lateral)
const drawerWidth = 240;

// Tema personalizado con un color primario definido
const themeColor = createTheme({
  palette: {
    primary: {
      main: '#CC3C5C', // Color principal del tema
    },
  },
});

// Estilo para el drawer cuando está abierto
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden', // Oculta el contenido que se desborda horizontalmente
});

// Estilo para el drawer cuando está cerrado
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden', // Oculta el contenido que se desborda horizontalmente
  width: `calc(${theme.spacing(7)} + 1px)`, // Ancho reducido
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`, // Ancho reducido para pantallas más grandes
  },
});

// Estilo para el encabezado del drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', // Alinea los elementos verticalmente al centro
  justifyContent: 'flex-end', // Alinea los elementos al final horizontalmente
  padding: theme.spacing(0, 1), // Espaciado interno
  // Necesario para que el contenido esté debajo de la barra de la aplicación
  ...theme.mixins.toolbar,
}));

// Estilo para la barra de la aplicación (AppBar)
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open', // Evita pasar la propiedad 'open' al componente base
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1, // Asegura que la barra esté encima del drawer
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth, // Ajusta el margen izquierdo cuando el drawer está abierto
    width: `calc(100% - ${drawerWidth}px)`, // Ajusta el ancho de la barra
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Estilo para el drawer (barra lateral)
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth, // Ancho del drawer
    flexShrink: 0, // Evita que el drawer se reduzca
    whiteSpace: 'nowrap', // Evita que el texto se envuelva
    boxSizing: 'border-box', // Define cómo se calculan los tamaños y bordes
    ...(open && {
      ...openedMixin(theme), // Aplica estilos cuando está abierto
      '& .MuiDrawer-paper': openedMixin(theme), // Aplica estilos al papel del drawer
    }),
    ...(!open && {
      ...closedMixin(theme), // Aplica estilos cuando está cerrado
      '& .MuiDrawer-paper': closedMixin(theme), // Aplica estilos al papel del drawer
    }),
  }),
);

const DrawerIcons = ({ children }) => {

  const theme = useTheme(); // Hook para acceder al tema actual
  const [open, setOpen] = React.useState(false); // Estado para controlar si el drawer está abierto o cerrado

  // Función para abrir el drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { loading } = useSelector(state => state.ui); // Obtiene el estado de carga desde Redux

  return (
    <Box sx={{ display: 'flex' }}> {/* Contenedor principal con diseño de flexbox */}
      <CssBaseline /> {/* Normaliza los estilos CSS */}
      <ThemeProvider theme={themeColor}> {/* Proveedor del tema personalizado */}
        <AppBar position="fixed" open={open} color="primary"> {/* Barra de navegación superior */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen} // Abre el drawer al hacer clic
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }), // Oculta el botón si el drawer está abierto
              }}
            >
              <MenuIcon /> {/* Icono del menú */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open} // Controla si el drawer está abierto o cerrado
          PaperProps={{
            sx: {
              backgroundColor: "#CC3C5C" // Color de fondo del drawer
            }
          }}
        >
          <DrawerHeader> {/* Encabezado del drawer */}
            <img src='/assets/CarWash1.png' width={180} height={100} alt="carwash" /> {/* Logo */}
            <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}> {/* Botón para cerrar el drawer */}
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} {/* Icono dinámico según la dirección del tema */}
            </IconButton>
          </DrawerHeader>
          <Divider /> {/* Línea divisoria */}
          <List>
            <Typography sx={{ color: "#FFFF" }}> {/* Texto con color blanco */}
              {['Inicio', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( // Lista de elementos del menú
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center', // Ajusta la alineación según el estado del drawer
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto', // Ajusta el margen según el estado del drawer
                        justifyContent: 'center',
                        color: 'white' // Color blanco para los iconos
                      }}
                    >
                      {index % 2 === 0 ? <HomeIcon /> : <MailIcon />} {/* Icono dinámico según el índice */}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> {/* Texto del elemento del menú */}
                  </ListItemButton>
                </ListItem>
              ))}
            </Typography>
          </List>
          <Divider /> {/* Línea divisoria */}
          <List>
            <Typography sx={{ color: "#FFFF" }}> {/* Texto con color blanco */}
              {['All mail', 'Trash', 'Spam'].map((text, index) => ( // Lista de elementos adicionales del menú
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center', // Ajusta la alineación según el estado del drawer
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto', // Ajusta el margen según el estado del drawer
                        justifyContent: 'center',
                        color: 'white' // Color blanco para los iconos
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} {/* Icono dinámico según el índice */}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> {/* Texto del elemento del menú */}
                  </ListItemButton>
                </ListItem>
              ))}
            </Typography>
          </List>
        </Drawer>
      </ThemeProvider>
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 10 }}> {/* Contenedor principal para el contenido */}
        {children} {/* Renderiza los hijos pasados al componente */}
      </Box>
    </Box>
  );
};

export default DrawerIcons
