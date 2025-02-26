import React from "react";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const BtnIconNotification = ({ amount, onClick = () => null }) => {
  return (
    <IconButton
      size="large"
      aria-label="show notifications"
      color="inherit"
      onClick={onClick}      
    >
      <Badge badgeContent={amount} color="primary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default BtnIconNotification;
