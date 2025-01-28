import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAuthStore } from "../../hooks";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom"; // Importa useLocation para obtener la ruta actual

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
  backgroundColor: `${theme.palette.primary.main}`,
  color: `${theme.palette.primary.contrastText}`,
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
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(245, 9, 9, 0.22)",
}));

const MenuDrawer = ({ navLinks }) => {
  const { navigate } = useAuthStore();
  const [expanded, setExpanded] = useState("");
  const location = useLocation(); // Obtiene la ruta actual

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleNavigateClick = (value) => {
    navigate(value, { replace: true });
  };

  return (
    <Box sx={{ width: drawerWidth }}>
      {navLinks.map((group, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={
              <ArrowCircleRightOutlined
                sx={{ color: "primary.contrastText" }}
              />
            }
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <Typography>
              {typeof group.title === "object"
                ? JSON.stringify(group.title)
                : group.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className="custom-scroll">
            {group.subRoutes.map((item, subIndex) => (
              <ListItem sx={{ width: "100%" }} key={subIndex} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigateClick(item.path)}
                  sx={{
                    borderRadius: "5px",
                    margin: 1,
                    bgcolor:
                      location.pathname === item.path
                        ? "success.main" // Color para la ruta activa
                        : "transparent", // Color para rutas inactivas
                    "&:hover": {
                      bgcolor: "primary.contrastTextSecond",
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MenuDrawer;
