import { Avatar, Badge, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import styled from "styled-components";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 19,
    top: 18,
  },
}));
const ImageDeleteCard = ({ src, handleDelete = () => null }) => {
  return (
    <StyledBadge
      badgeContent={
        <IconButton
          sx={{ backgroundColor: "black", color: "black" }}
          onClick={handleDelete}
        >          
          <DeleteIcon sx={{ color: "white", fontSize: "20px" }} />{" "}
        </IconButton>
      }
    >
      <Avatar
        src={src}
        variant="square"
        sx={{ width: "100%", height: "100px" }}
      />
    </StyledBadge>
  );
};

export default ImageDeleteCard;
