import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

const FormModal = ({ setValuesCar, id, setReload }) => {
  // Estado para controlar si el modal está abierto o cerrado
  const [open, setOpen] = useState(false);
  // Estado para almacenar el archivo seleccionado
  const [selectedFile, setSelectedFile] = useState(null);
  // Estado para almacenar la vista previa de la imagen seleccionada
  const [previewImage, setPreviewImage] = useState(null);
  // Estado para controlar el estado de carga del botón
  const [loading, setLoading] = useState(false);

  // Esquema de validación para el formulario utilizando Yup
  const ValidateSchema = Yup.object().shape({
    plate_number: Yup.string()
      .min(7, "Introduce una placa valida")
      .max(7, "Introduce una placa valida")
      .required("Informacion requerida"),
  });

  // Maneja la selección de la imagen y genera una vista previa
  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  // Abre el modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Cierra el modal
  const handleClose = () => {
    setOpen(false);
  };

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      customer_id: id, // ID del cliente
      plate_number: "", // Número de placa
      carDetail_image: "", // Imagen del auto
      status: true, // Estado del auto
    },
    validationSchema: ValidateSchema, // Validación del formulario
    onSubmit: (values) => {
      try {
        // Asigna el archivo seleccionado al campo correspondiente
        values.carDetail_image = selectedFile;
        setLoading(true); // Activa el estado de carga
        setTimeout(() => {
          setLoading(false); // Desactiva el estado de carga
          setOpen(false); // Cierra el modal
          setValuesCar(values); // Actualiza los valores del auto
          setReload(true); // Indica que se debe recargar la lista
        }, 2000);
      } catch (error) {
        console.log(error); // Manejo de errores
      }
    },
  });

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Auto
      </Button>
      {/* Modal de diálogo */}
      <Dialog open={open} onClose={handleClose}>
        {/* Formulario dentro del modal */}
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Agregar auto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Llena todos los campos para agregar tu auto
            </DialogContentText>
            {/* Contenedor principal del formulario */}
            <Grid
              color="#F7BFBF"
              borderRadius={5}
              mt={3}
              sx={{ border: 4, p: 5 }}
              container
              spacing={4}
            >
              {/* Contenedor para los campos del formulario */}
              <Grid
                item
                sm={8}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                {/* Tarjeta para mostrar la imagen seleccionada */}
                <Grid item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      {/* Vista previa de la imagen */}
                      <CardMedia
                        sx={{ height: 140 }}
                        image={previewImage ? previewImage : ""}
                        title={
                          selectedFile ? selectedFile.name : "Selecciona imagen"
                        }
                      />
                      {/* Título de la tarjeta */}
                      <Typography gutterBottom variant="h5" component="div">
                        {selectedFile
                          ? selectedFile.name
                          : previewImage
                          ? "Cambiar imagen"
                          : "Elige una imagen"}
                      </Typography>
                    </CardContent>
                    {/* Input para seleccionar la imagen */}
                    <CardActions>
                      <input
                        type="file"
                        id="carDetail_image"
                        name="carDetail_image"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImage(e)}
                      />
                    </CardActions>
                  </Card>
                </Grid>
                {/* Campo de texto para el número de placa */}
                <TextField
                  focused
                  fullWidth
                  id="plate_number"
                  name="plate_number"
                  type="text"
                  label="Placa"
                  variant="outlined"
                  value={formik.values.plate_number}
                  sx={{ margin: 2 }}
                  onChange={formik.handleChange}
                  helperText={
                    formik.errors.plate_number ? formik.errors.plate_number : ""
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {/* Botón de guardar con estado de carga */}
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<Save />}
              variant="outlined"
              type="submit"
            >
              Guardar
            </LoadingButton>
            {/* Botón para cerrar el modal */}
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Salir
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default FormModal;
