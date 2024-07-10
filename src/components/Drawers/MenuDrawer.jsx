import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuthStore } from "../../hooks";
import { Links } from "../../routes/Links";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Add } from "@mui/icons-material";

export default function MenuDrawer() {
  const { navigate } = useAuthStore();
  const [open, setOpen] = useState({});

  const handleClick = (title) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [title]: !prevOpen[title],
    }));
  };

  return (
    <Box sx={{ width: 250 }}>
      <List
        sx={{ width: '100%', maxWidth: 350 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {Links.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              onClick={() => {
                if (item.subRoutes) {
                  handleClick(item.title);
                } else {
                  navigate(item.pathMain || item.path, { replace: true });
                }
              }}
            >
              <ListItemIcon sx={{ color:'#fff'}} >
                {item.Icon}
              </ListItemIcon>
              <ListItemText sx={{marginLeft:'-20px'}} primary={item.title} />
              {item.subRoutes ? (open[item.title] ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
            </ListItemButton>
            {item.subRoutes && (
              <Collapse in={open[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subRoutes.map((subItem, subIndex) => (
                    <ListItemButton
                      key={subIndex}
                      sx={{ pl: 3 }}
                      onClick={() => navigate(subItem.path, { replace: true })}
                    >
                      <ListItemIcon sx={{bgcolor:"primary.main"}} >
                        {subItem.Icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
