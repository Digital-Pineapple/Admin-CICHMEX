import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom
} from "@mui/material";
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

import { NavLink } from "react-router-dom";
function NavListDrawer({ navArrayLinks}) {
  return (
    <>
      <List>
        <ListItem  sx={{ display: "block" }} disablePadding>
        <NavLink to={"/auth/home"} style={{ color: "white", textDecoration:'none' }} >
          <ListItemButton
           sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: "#95C8FF",
            },
            px: 3,
          }}
          >
            <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "GrayText",
                  }}
                >
                <CottageOutlinedIcon/>
                </ListItemIcon>
                <ListItemText  sx={{ color: "white", textUnderlineOffset:"" }}>
                  Home
                </ListItemText>

          </ListItemButton>
          </NavLink>
        </ListItem>
        <Divider/>
        {navArrayLinks.map((item) => (
          <ListItem sx={{ display: "block" }} disablePadding key={item.title}>
            <Tooltip TransitionComponent={Zoom} placement="right" arrow  title={item.title}>
            <NavLink to={item.path} style={{ color: "white", textDecoration:'none' }} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  backgroundColor: "inherit",
                  "&:hover": {
                    backgroundColor: "#95C8FF",
                  },
                  px: 3,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#3877FF",
                  }}
                >
                  {item.Icon}
                </ListItemIcon>
                <ListItemText  sx={{ color: "white", textUnderlineOffset:"" }}>
                  {item.title}
                </ListItemText>
              </ListItemButton>
            </NavLink>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default NavListDrawer;
