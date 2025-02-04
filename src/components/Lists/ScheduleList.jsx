import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


export default function ScheduleList({schedules}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "whitesmoke" }}>
      {schedules?.map((schedule, index) => (
        <ListItem key={index} sx={{flexGrow:1, backgroundColor:""}}>
            <ListItemText
              sx={{backgroundColor:"", textAlign:"start", textTransform:"capitalize"}}
              primary={schedule?.day}
            />
            <ListItemText              
              sx={{backgroundColor:"", textAlign:"end"}}
              primary={schedule.close && schedule.open ? `${schedule.open} - ${schedule.close}` : "Cerrado"}
            />
        </ListItem>
      ))}  
    </List>
  );
}
