import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Delete } from "@mui/icons-material";
import WarningAlert from "./WarningAlert";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const StyledCard = ({ id, brand, model, plate, version, image, setDelete }) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setDelete(id);
    setOpen(false);
  }
  

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={brand} subheader={model} />
        <CardMedia component="img" height="194" image={image} alt={id} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Placa:{plate}
            <br />
            Version:{version}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <Button variant="outlined" onClick={handleClickOpen}>
        Eliminar
      </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert"
      >
        <DialogTitle id={id}>
          {`¿Estas seguro que deseas eliminar el vehiculo ${plate}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StyledCard;
