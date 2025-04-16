import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { styled, Card, CardMedia, CardActions, Skeleton, Fab, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { Cancel, Close, CloudDone, CloudUpload, Done, Edit } from "@mui/icons-material";
import noImage from "../../assets/Images/ui/no-image.png";

// Estilo para el modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

// Componente de input visualmente oculto para subir archivos
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Componente principal para actualizar imágenes
const ImageUpdateField = ({ idProduct, imageProduct, onSubmit, textButton }) => {
  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);
  // Estado para mostrar un loader mientras se carga una imagen
  const [loader, setloader] = useState(false);
  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState(null);
  // Estado para almacenar el archivo de imagen seleccionado
  const [fileImage, setFileImage] = useState([]);

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal y restaurar la vista previa de la imagen
  const handleClose = () => {
    if (imageProduct?.length > 0) {
      setImagePreview(imageProduct);
    }
    setOpen(false);
  };

  // Efecto para inicializar la vista previa de la imagen cuando cambia `imageProduct`
  useEffect(() => {
    if (imageProduct !== null) {
      setImagePreview(imageProduct);
    }
  }, [imageProduct]);

  // Función para manejar la carga de una nueva imagen
  const handleUploadImage = (event) => {
    setloader(true); // Muestra el loader
    event.preventDefault();
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    setFileImage(file); // Guarda el archivo en el estado
    const imageUrl = URL.createObjectURL(file); // Genera una URL para la vista previa
    setImagePreview(imageUrl); // Actualiza la vista previa
    setloader(false); // Oculta el loader
  };

  // Función para guardar la imagen cargada
  const handleSaveImage = () => {
    onSubmit(idProduct, fileImage); // Llama a la función `onSubmit` con el ID del producto y la imagen
    setFileImage(""); // Limpia el archivo seleccionado
    handleClose(); // Cierra el modal
  };

  // Si el loader está activo, muestra un esqueleto de carga
  if (loader) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <div>
      {/* Tarjeta principal que muestra la imagen o un placeholder */}
      <Card sx={{ padding: 2 }} variant="outlined">
        <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
          {open ? (
            <Skeleton variant="rectangular" width={250} height={'450px'} />
          ) : imagePreview !== null ? (
            <img style={{ borderRadius: '10px' }} width="300" height="450" src={imagePreview} />
          ) : (
            <img style={{ borderRadius: '10px' }} width="300" height="450" src={noImage} alt="No image available" />
          )}
        </CardMedia>
        <CardActions>
          {/* Botón para abrir el modal */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            fullWidth
            tabIndex={-1}
            startIcon={imagePreview ? <Edit /> : <CloudUpload />}
            onClick={() => handleOpen()}
          >
            {imagePreview ? `${textButton}` : "Subir "}
          </Button>
        </CardActions>
      </Card>

      {/* Modal para editar y guardar la imagen */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Botón para cerrar el modal */}
          <Grid container display={'flex'} justifyContent={'end'} spacing={0}>
            <Fab
              color="primary"
              aria-label="Cancelar"
              sx={{ alignContent: 'flex-end' }}
              title="Cancelar"
              onClick={() => handleClose()}
            >
              <Close />
            </Fab>
          </Grid>
          <Card variant="elevation">
            <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
              {loader ? (
                <Skeleton />
              ) : imagePreview !== null ? (
                <img style={{ objectFit: 'contain' }} width="300" height={'450px'} src={imagePreview} />
              ) : (
                <img src={noImage} width="300" height={'450px'} alt="No image available" />
              )}
            </CardMedia>
            <CardActions>
              {/* Botón para seleccionar una nueva imagen */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                fullWidth
              >
                Editar
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg "
                  onChange={(e) => handleUploadImage(e)}
                />
              </Button>
              {/* Botón para guardar la imagen seleccionada */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudDone />}
                onClick={() => handleSaveImage()}
                fullWidth
                color="success"
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageUpdateField;
