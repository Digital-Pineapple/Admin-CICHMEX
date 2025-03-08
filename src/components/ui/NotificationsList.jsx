import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import NotiCard from "../cards/NotiCard";

const NotificationsList = ({ notifications, isLoading, emptyMessage = "No tienes notificaciones"}) => {
  if (isLoading) {
    return (
      <Stack rowGap={2}>
        {new Array(9).fill(null).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={140}
          />
        ))}
      </Stack>
    );
  }
  return (
    <Box>
      {notifications?.length === 0 ? (
        <Typography textAlign={"center"}>{emptyMessage}</Typography>
      ) : (
        notifications?.map((notification) => {
          return (
            <NotiCard notification={notification} key={notification?._id} />
          );
        })
      )}
    </Box>
  );
};

export default NotificationsList;
