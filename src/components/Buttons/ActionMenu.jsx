import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

// Componente principal que representa un menú de acciones desplegable
const ActionMenu = ({ actions = [], row }) => {
  // Estado para manejar el anclaje del menú
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Maneja el clic del botón para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Maneja el cierre del menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Botón de ícono que abre el menú */}
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      {/* Menú desplegable que contiene las acciones */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* Itera sobre las acciones y genera un elemento de menú para cada una */}
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              action.onClick(row);
            }}
            disabled={action.disabled}
          >
            {/* Muestra un ícono opcional junto con la etiqueta de la acción */}
            {action.icon && <action.icon color={action.icon_color} style={{ marginRight: 8 }} />}
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
