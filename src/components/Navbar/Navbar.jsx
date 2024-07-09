import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuDrawer from "../Drawers/MenuDrawer";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Inbox, Mail, Menu } from "@mui/icons-material";
import { useState } from "react";
import { Links } from "../../routes/Links";
import { useAuthStore } from "../../hooks";
import AvatarCustom from "../ui/AvatarCustom";

const drawerWidth = 240;
const heigthToolbar = 100;

export const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuthStore();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const handleButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  console.log(user);
  const list = () => (
    <Box
      sx={{ width: drawerWidth, mt: "60px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List component={"nav"}>
        {Links?.map(({ title, path, Icon }, index) => {
          return (
            <ListItemButton
              key={index}
              onClick={() =>
                navigate(path, {
                  replace: true,
                })
              }
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            marginX: "5%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "primary.contrastText" }}
            onClick={handleButtonClick}
          >
            <Menu/>
          </IconButton>
          <Typography
            variant="h6"
            fontSize={{ xs: "20px", sm: "30px" }}
            noWrap
            component="div"
          >
            {user.fullname}
          </Typography>
          <AvatarCustom ProfileImage={user.profile_image} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          },
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Toolbar />
        <MenuDrawer />
      </Drawer>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
