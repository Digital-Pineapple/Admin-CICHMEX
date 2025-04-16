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
  Grid2,
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

// Estilo para un input visualmente oculto
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

const VariantImagesUpdate = ({ idProduct, imagesProduct =[], color, handleClose }) => {
  const [loader, setLoader] = useState(false); // Estado para mostrar un loader
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [mainImageId, setMainImageId] = useState(null); // Estado para identificar la imagen principal
  const { updateMultipleImagesVariant } = useProducts(); // Hook para actualizar imágenes en el producto
  
  // Efecto para mapear las imágenes iniciales y establecer la primera como principal
  useEffect(() => {
    if (imagesProduct !== null) {
      const mappedImages = imagesProduct?.map((item) => ({
        id: uuidv4(),
        filePreview: item,
        file: null,
      }));
      setImages(mappedImages);
      setMainImageId(mappedImages[0]?.id || null); // Primera imagen como principal
    }
  }, [imagesProduct]);

  // Función para eliminar una imagen
  const deleteImage = (product_id) => {
    setImages((prev) => prev.filter((image) => image.id !== product_id));
    if (mainImageId === product_id) {
      setMainImageId(images[1]?.id || null); // Asignar nueva imagen principal si se elimina la actual
    }
  };

  // Función para manejar la carga de nuevas imágenes
  const handleChangeImages = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
  
    if (!files.length) return;
  
    const newImages = files.map((file) => ({
      id: uuidv4(), // Genera un ID único
      filePreview: URL.createObjectURL(file), // Crea una URL para previsualización
      file, // Guarda el archivo original
    }));
  
    setImages((prevImages) => [...prevImages, ...newImages]); // Combina con las imágenes existentes
  };

  // Función para mover una imagen en la lista
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
  };

  // Función para seleccionar una imagen como principal
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

  // Función para guardar los cambios realizados en las imágenes
  const handleSaveChanges = (images) => {
    updateMultipleImagesVariant({ product_id: idProduct, images: images, color: color }, handleClose);
  };

  // Mostrar un loader mientras se cargan los datos
  if (loader) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }
  
  return (
    <div>
      <Card sx={{ padding: 2 }} variant="elevation">
        <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
          <ImageList sx={{ width: "100%", height: 400 }}>
            {images.map((item, index) => (
              <ImageListItem key={index}>
                {/* Mostrar la previsualización de la imagen */}
                <img src={`${item.filePreview}`} alt={index} style={{ width: '100%', objectFit: 'contain', height: '200px', display: 'flex', justifyContent: 'center' }} />
                <Grid2 container justifyContent="center" mt={1}>
                  {/* Botones para mover la imagen */}
                  <ButtonGroup>
                    <Button
                      onClick={() => moveImage(index, -1)}
                      disabled={index === 0}
                    >
                      <NavigateBefore />
                    </Button>
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
                  {/* Chip para marcar la imagen como principal */}
                  <Chip
                    label={
                      mainImageId === item.id ? "Principal" : "Hacer Principal"
                    }
                    color={mainImageId === item.id ? "primary" : "default"}
                    onClick={() => handleSelectMainImage(item.id)}
                    clickable
                  />
                </Grid2>
              </ImageListItem>
            ))}
          </ImageList>
        </CardMedia>
        <CardActions>
          {/* Botón para agregar nuevas imágenes */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            fullWidth
            color='primary'
          >
            Agregar
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpeg , image/webp"
              multiple
              onChange={(e) => handleChangeImages(e)}
            />
          </Button>
          {/* Botón para guardar los cambios */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Save />}
            fullWidth
            color="success"
            onClick={() => handleSaveChanges(images)}
          >
            Guardar cambios de imagenes
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default VariantImagesUpdate;
