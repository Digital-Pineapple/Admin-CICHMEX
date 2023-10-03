import Button from "@mui/material/Button";
import { useState, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";

const SaveButton = ({ title, list,setSave }) => {
  const [open, setOpen] = useState(false);
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk =()=>{
    setSave();
    setOpen(false);
  }

  return (
    <>
      <Button variant="contained" color="inherit" onClick={handleClickOpen}>
        Guardar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
          {list ? list && list.map((item)=>{
        <List>
          <ListItem disablePadding>
            
              <ListItemText primary={`Nombre:${item.name}`} />
            
          </ListItem>
          <ListItem disablePadding>
            
              <ListItemText primary="Spam" />
           
          </ListItem>
        </List>
          }):""}
          
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
          <Button onClick={handleClose}>cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
