import { Avatar, Box, Button, Chip, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markNotificationAsReadById } from "../../store";
import { getTimeFromNow } from "../../helpers/hoursDate";

const NotificationItem = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});
const NotiCard = ({ notification }) => {
  const { message, type, resource_id, readed, status, channel, createdAt } = notification;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNotificationAsRead = (id) => {
    dispatch(markNotificationAsReadById(id));
  };
  return (
    <NotificationItem>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <Avatar src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-02-24%20a%20la(s)%2010.48.00%E2%80%AFa.m.-JeNrH94RY3ztakXurKxzE2G3wbnC8X.png" /> */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 500 }}>{message ?? ""}</Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 2 }}
          >
            {getTimeFromNow(createdAt)}            
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {!readed && (
              <Button
                onClick={() => handleNotificationAsRead(notification?._id)}
                variant="contained"
                color="primary"
                size="small"
                sx={{ textTransform: "inherit" }}
              >
                Marcar como leida
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </NotificationItem>
  );
};

export default NotiCard;
