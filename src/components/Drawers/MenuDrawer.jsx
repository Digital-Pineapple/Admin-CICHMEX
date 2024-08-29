import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuthStore } from "../../hooks";
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function MenuDrawer({ navLinks }) {
  const { navigate } = useAuthStore();
  const [open, setOpen] = useState({});

  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box sx={{ width: 250 }}>
      
        {navLinks.map((group, index) => (
      <Accordion
        key={index}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
          <Typography>{group.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {group.subRoutes.map((item, subIndex) => (
            <ListItemButton key={subIndex} component="a" href={item.path}>
            <ListItemText primary={item.name} />
          </ListItemButton>
          ))}
        </AccordionDetails>
      </Accordion>
    ))}
    </Box>
  );
}
