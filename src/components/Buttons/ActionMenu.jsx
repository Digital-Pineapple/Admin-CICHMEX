import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { color } from "@mui/system";
import { useState } from "react";



const ActionMenu = ({ actions = [], row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              action.onClick(row);
            }}
            disabled={action.disabled}
          >
            {action.icon && <action.icon color={action.icon_color} style={{ marginRight: 8 }} />}
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
