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

// Componente principal SaveButton que muestra un botón y un diálogo de confirmación
const SaveButton = ({ title, list, setSave }) => {
  // Estado para controlar si el diálogo está abierto o cerrado
  const [open, setOpen] = useState(false);

  // Transición para el diálogo (animación de deslizamiento hacia arriba)
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  // Función para abrir el diálogo
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el diálogo
  const handleClose = () => {
    setOpen(false);
  };

  // Función para manejar la acción de guardar y cerrar el diálogo
  const handleOk = () => {
    setSave();
    setOpen(false);
  };

  return (
    <>
      {/* Botón que abre el diálogo */}
      <Button variant="contained" color="inherit" onClick={handleClickOpen}>
        Guardar
      </Button>

      {/* Diálogo de confirmación */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        {/* Título del diálogo */}
        <DialogTitle>{title}</DialogTitle>

        {/* Lista de elementos si está disponible */}
        {list
          ? list.map((item) => {
              return (
                <List>
                  <ListItem disablePadding>
                    <ListItemText primary={`Nombre:${item.name}`} />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="Spam" />
                  </ListItem>
                </List>
              );
            })
          : ""}

        {/* Botones de acción del diálogo */}
        <DialogActions>
          <Button onClick={handleOk}>Ok</Button>
          <Button onClick={handleClose}>cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
