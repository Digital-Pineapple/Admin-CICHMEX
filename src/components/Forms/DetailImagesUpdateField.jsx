import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  styled,
  Card,
  CardMedia,
  CardActions,
  Skeleton,
  Fab,
  Grid,
  CardContent,
  ImageList,  
  ImageListItem,
  ButtonGroup,
  Chip,
} from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  Cancel,
  Close,
  CloudDone,
  CloudUpload,
  Done,
  Edit,
  NavigateBefore,
  NavigateNext,
  Save,
} from "@mui/icons-material";
import noImage from "../../assets/Images/ui/no-image.png";
import useImages from "../../hooks/useImages";
import { useProducts } from "../../hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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

const DetailImagesUpdateField = ({ idProduct, imagesProduct, onSubmit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleOpen = () => setOpen(true);
  const [images, setImages]=useState([]);
  const [mainImageId, setMainImageId] = useState(null); // Imagen principal
  const {changeImagePositions} =useProducts()
  useEffect(() => {
    if (imagesProduct !== null) {
      const mappedImages = imagesProduct.map((item) => ({
        id: item._id,
        filePreview: item.url,
        file: null,
      }));
      setImages(mappedImages);
      setMainImageId(mappedImages[0]?.id || null); // Primera imagen como principal
    }
  }, [imagesProduct]);

   const handleClose = () => {
    setOpen(false);
    if (imagesProduct !== null) {
      const mappedImages = imagesProduct.map((item) => ({
        id: item._id,
        filePreview: item.url,
        file: "",
      }));
      setImages(mappedImages);
      setMainImageId(mappedImages[0]?.id || null); // Restaurar la imagen principal
    }
    setLoader(false);
  };

  const deleteImage = (product_id) => {
    // onDelete(idProduct, product_id);
    setImages((prev) => prev.filter((image) => image.id !== product_id));
    if (mainImageId === product_id) {
      setMainImageId(images[1]?.id || null); // Nueva imagen principal
    }
  };

  const handleSubmitImage = (e) => {
    setLoader(true);
    e.preventDefault();
    let file = e.target.files[0];
    onSubmit(idProduct, file);
    setLoader(false);
  };

  const moveImage = (index, direction) => {
    setImages((prevImages) => {
      // Evitar que cualquier imagen se mueva a la posición 0 excepto la principal
      if (index === 0 || (index + direction === 0 && mainImageId !== prevImages[index].id)) {
        return prevImages;
      }
  
      const newImages = [...prevImages];
      const [removed] = newImages.splice(index, 1);
      newImages.splice(index + direction, 0, removed);
  
      return newImages;
    });
  };;

  const handleSelectMainImage = (id) => {
    setMainImageId(id);
  
    setImages((prevImages) => {
      const selectedImageIndex = prevImages.findIndex((image) => image.id === id);
      if (selectedImageIndex > -1) {
        const selectedImage = prevImages[selectedImageIndex];
        // Mover la imagen seleccionada como principal a la posición 0
        const updatedImages = [
          selectedImage,
          ...prevImages.filter((image) => image.id !== id),
        ];
        return updatedImages;
      }
      return prevImages;
    });
  };



  const handleSaveChanges = (e) => {
    e.preventDefault()
    changeImagePositions(idProduct,images)
    handleClose();
  };


  if (loader) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }
  
  return (
    <div>
      {/* Tarjeta principal que muestra las imágenes o un placeholder si no hay imágenes */}
      <Card sx={{ padding: 2 }} variant="elevation">
        <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
          {open ? (
            // Esqueleto de carga mientras se cargan las imágenes
            <Skeleton variant="rectangular" width={200} height={"300px"} />
          ) : images.length > 0 ? (
            // Lista de imágenes si existen
            <ImageList sx={{ msxWidth: 200, maxHeight: 200 }}>
              {images?.map((item, index) => (
                <ImageListItem key={index}>
                  <img src={`${item.filePreview}`} alt={index} />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            // Imagen de marcador de posición si no hay imágenes
            <img src={noImage} alt="No image available" />
          )}
        </CardMedia>
        <CardActions>
          {/* Botón para abrir el modal y editar o subir imágenes */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={images ? <Edit /> : <CloudUpload />}
            onClick={() => setOpen(true)}
            fullWidth
          >
            {images ? "Editar imagenes" : "Subir"}
          </Button>
        </CardActions>
      </Card>

      {/* Modal para gestionar las imágenes */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Botón para cerrar el modal */}
          <Grid container display={"flex"} justifyContent={"end"} spacing={0}>
            <Fab
              color="primary"
              aria-label="Cancelar"
              sx={{ alignContent: "flex-end" }}
              title="Cancelar"
              onClick={handleClose}
            >
              <Close />
            </Fab>
          </Grid>
          <Card sx={{ padding: 2 }} variant="elevation">
            <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
              {/* Lista de imágenes dentro del modal */}
              <ImageList sx={{ width: "100%", height: 400 }}>
                {images.map((item, index) => (
                  <ImageListItem key={item.id}>
                    {/* Imagen con estilo */}
                    <img
                      src={`${item.filePreview}`}
                      alt={index}
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                    {/* Controles para mover, eliminar y seleccionar imagen principal */}
                    <Grid container justifyContent="center" mt={1}>
                      <ButtonGroup>
                        {/* Botón para mover la imagen hacia la izquierda */}
                        <Button
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                        >
                          <NavigateBefore />
                        </Button>
                        {/* Botón para mover la imagen hacia la derecha */}
                        <Button
                          onClick={() => moveImage(index, 1)}
                          disabled={index === images.length - 1}
                        >
                          <NavigateNext />
                        </Button>
                      </ButtonGroup>
                      {/* Botón para eliminar la imagen */}
                      <Button
                        onClick={() => deleteImage(item.id)}
                        variant="contained"
                        color="warning"
                        sx={{ marginX: 1 }}
                      >
                        Eliminar
                      </Button>
                      {/* Chip para marcar o seleccionar la imagen principal */}
                      <Chip
                        label={
                          mainImageId === item.id
                            ? "Principal"
                            : "Hacer Principal"
                        }
                        color={mainImageId === item.id ? "primary" : "default"}
                        onClick={() => handleSelectMainImage(item.id)}
                        clickable
                      />
                    </Grid>
                  </ImageListItem>
                ))}
              </ImageList>
            </CardMedia>
            <CardActions>
              {/* Botón para agregar una nueva imagen */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                fullWidth
                color="primary"
              >
                Agregar
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg "
                  onChange={(e) => handleSubmitImage(e)}
                />
              </Button>
              {/* Botón para guardar los cambios realizados en las imágenes */}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Save />}
                fullWidth
                color="success"
                onClick={(e) => handleSaveChanges(e)}
              >
                Guardar cambios de imagenes
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailImagesUpdateField;
