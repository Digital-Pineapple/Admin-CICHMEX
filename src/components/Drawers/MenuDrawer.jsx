import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuthStore } from "../../hooks";
import { Links } from "../../routes/Links";


export default function MenuDrawer() {
  const { navigate } = useAuthStore()

  return (
    <Box
      sx={{ width: 250 }}
    >
      <List component={"nav"}>
        { Links?.map(({ title, path, Icon }, index) => {
            return (
              <ListItemButton
              
                key={index}
                onClick={() =>
                  navigate(path, {
                    replace: true,
                  })
                }
              >
                <ListItemIcon sx={{color:'primary.contrastText'}} >{Icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            );
          })}
      </List>
    </Box>
  );
}
