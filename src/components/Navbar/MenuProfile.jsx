import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

// Componente principal que representa el menú de perfil del usuario
export const MenuProfile = ({ user }) => {
  // Estado para controlar si el menú está abierto o cerrado
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Maneja el evento de clic para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Maneja el evento de cierre del menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {/* Contenedor para el avatar y el botón del menú */}
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* Tooltip que muestra "Account settings" al pasar el cursor sobre el avatar */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick} // Abre el menú al hacer clic
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined} // Asocia el menú con el botón
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* Muestra el avatar del usuario con su imagen de perfil */}
            <Avatar src={user.profile_image} sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Menú desplegable que se muestra al hacer clic en el avatar */}
      <Menu
        anchorEl={anchorEl} // Define el elemento al que está anclado el menú
        id="account-menu"
        open={open} // Controla si el menú está abierto o cerrado
        onClose={handleClose} // Cierra el menú al hacer clic fuera de él
        onClick={handleClose} // Cierra el menú al hacer clic en una opción
        PaperProps={{
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
            '&:before': {
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
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }} // Define el origen de la transformación del menú
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} // Define dónde se ancla el menú
      >
        {/* Opciones del menú */}
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile {/* Opción para ver el perfil del usuario */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account {/* Opción para acceder a la cuenta del usuario */}
        </MenuItem>
        <Divider /> {/* Separador visual entre las opciones */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" /> {/* Icono para agregar otra cuenta */}
          </ListItemIcon>
          Add another account {/* Opción para agregar otra cuenta */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" /> {/* Icono para configuración */}
          </ListItemIcon>
          Settings {/* Opción para acceder a la configuración */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" /> {/* Icono para cerrar sesión */}
          </ListItemIcon>
          Logout {/* Opción para cerrar sesión */}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MenuProfile;
