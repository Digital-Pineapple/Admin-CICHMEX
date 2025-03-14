import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import AvatarCustom from "../ui/AvatarCustom";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import MenuDrawer from "../Drawers/MenuDrawer";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAuthStore } from "../../hooks";
import { Divider, Grid2, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ImageMain from '../../assets/Images/CHMX/Imagotipo CICHMEX Naranja.png';
import Image from "mui-image";
import BtnIconNotification from "../ui/BtnIconNotification";
import NotificationsPanel from "../ui/Notifications";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
// import io from "socket.io-client";

const drawerWidth = 240;

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "primary.contrastText" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const drawerPaperStyle = {
  width: drawerWidth,
  boxSizing: "border-box",
  color: "primary.main",
  backgroundColor: "primary.main",
};

export const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [showNotiDrawer, setShowNotiDrawer] = useState(false);

  // Se unifican las desestructuraciones
  const { logged, navigate, user, routes } = useAuthStore();
  const { notifications } = useSelector((state) => state.notifications);
  const { groupRoutes } = useDynamicRoutes();

  const listLinks = groupRoutes(routes);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : "");
    },
    []
  );

  const handleNavigateClick = useCallback(
    (value) => {
      navigate(value, { replace: true });
      setDrawerOpen(false);
    },
    [navigate]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}  
        open={showNotiDrawer} 
        anchor="right" 
        onClose={() => setShowNotiDrawer(false)}
      >
        <NotificationsPanel />            
      </Drawer>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "success.main",
          color: "primary.contrastText",
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "primary.main" }}
            onClick={toggleDrawer}
            edge="start"
          >
            <Menu />
          </IconButton>
          <Grid2
            width={drawerWidth}
            sx={{ display: { xs: "none", md: "flex" }, alignContent: "center", paddingX: 2 }}
          >
            <Link to="/">
              <Image
                src={ImageMain}
                alt="image-main"
                style={{ objectFit: "contain" }}
                width="160px"
              />
            </Link>
          </Grid2>
          <Divider orientation="vertical" flexItem />
          <Grid2 width="100%" display="flex" justifyContent="space-between">
            <Grid2 size={{ xs: 6, md: 8, xl: 9 }} padding={1}>
              <Typography
                variant="h6"
                fontSize={{ xs: "20px", sm: "30px" }}
                fontWeight="Bold"
              >
                {user.fullname}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 1 }} sx={{ display: "flex" }}>
              <AvatarCustom />
              <BtnIconNotification
                amount={notifications?.filter((item) => !item.readed).length}
                onClick={() => setShowNotiDrawer(true)}
              />
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": drawerPaperStyle,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Toolbar />
        <MenuDrawer navLinks={listLinks} />
      </Drawer>

      <Drawer
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": drawerPaperStyle,
        }}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: drawerWidth, mt: { xs: "56px", sm: "65px" } }}>
          {listLinks.map((group, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                <Typography>{group.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {group.subRoutes.map((item, subIndex) => (
                  <ListItemButton
                    key={subIndex}
                    onClick={() => handleNavigateClick(item.path)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 5, minHeight: "100vh" }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
