import { Badge, Box, Chip, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    // right: 10,
    left: 30,
    top: 0,
    // border: `2px solid grey`,
    padding: "0 4px",
    backgroundColor: "primary",
  },
}));

const SchedulesPicker = ({
  items,
  onSelectSchedule,
  onCleanSchedule,
  onSelectAll,
}) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={2}>
      {/* {
          items.length > 0 && 
          <pre>
            {JSON.stringify(items, null, 2)}
          </pre>
      } */}
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {!item.open && !item.close ? (
              <Chip
                onClick={() => onSelectSchedule(item.day)}
                color={item.selected ? "success" : "default"}
                clickable
                size="large"
                key={index}
                label={item?.day}
              />
            ) : (
              <StyledBadge
                badgeContent={
                  <Typography
                    color={"primary"}
                    fontSize={13}
                    fontWeight={"bold"}
                  >
                    {item.day}
                  </Typography>
                }
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Chip
                  size="large"
                  key={index}
                  onDelete={() => onCleanSchedule(item.day)}
                  clickable
                  label={`${item.open} - ${item.close}`}
                />
              </StyledBadge>
            )}
          </React.Fragment>
        );
      })}
      <Chip label={"Todos"} clickable onClick={onSelectAll} />
    </Box>
  );
};

export default SchedulesPicker;
