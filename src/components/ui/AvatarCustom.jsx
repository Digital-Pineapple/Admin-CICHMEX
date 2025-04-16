import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAuthStore } from '../../hooks';
import { Person } from '@mui/icons-material';

export default function AvatarCustom() {
  // Estado para manejar el anclaje del menú desplegable
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, loadLogout, navigate } = useAuthStore(); // Hook personalizado para manejar la autenticación
  const open = Boolean(anchorEl); // Determina si el menú está abierto

  // Maneja el evento de clic en el botón del avatar para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Cierra el menú desplegable
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Llama a la función de logout del hook de autenticación
  const handleLogout = () => {
    loadLogout();
  };

  // Navega a la página "Mi cuenta" del usuario actual
  const handleNavigateMyAccount = () => {
    setAnchorEl(null); // Cierra el menú antes de navegar
    navigate(`/mi-cuenta/${user._id}`);
  };

  return (
    <React.Fragment>
      {/* Contenedor para el avatar y el botón del menú */}
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* Tooltip para mostrar información adicional al pasar el cursor */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick} // Abre el menú al hacer clic
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* Avatar del usuario con imagen de perfil o inicial */}
            <Avatar sx={{ width: 45, height: 45 }} src={user.profile_image}>
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menú desplegable para opciones de cuenta */}
      <Menu
        anchorEl={anchorEl} // Elemento al que está anclado el menú
        id="account-menu"
        open={open} // Estado de apertura del menú
        onClose={handleClose} // Cierra el menú al hacer clic fuera
        onClick={handleClose} // Cierra el menú al seleccionar una opción
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Opción para mostrar el correo del usuario */}
        <MenuItem onClick={handleClose}>
          <Avatar /> {user?.email}
        </MenuItem>
        <Divider /> {/* Separador visual entre opciones */}
        {/* Opción para navegar a "Mi cuenta" */}
        <MenuItem onClick={handleNavigateMyAccount}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Mi cuenta
        </MenuItem>
        {/* Opción para cerrar sesión */}
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
