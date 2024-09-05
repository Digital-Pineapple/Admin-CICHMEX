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
} from "@mui/material";
import {
  Cancel,
  Close,
  CloudDone,
  CloudUpload,
  Done,
  Edit,
} from "@mui/icons-material";
import noImage from "../../assets/Images/ui/no-image.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
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

const DetailImagesUpdateField = ({ idProduct, imagesProduct, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const handleOpen = () => setOpen(true);
  const [images, setImages]=useState([]);

  useEffect(() => {
    if (imagesProduct !== null) {
      setImages(imagesProduct.map((item, index) => {
        return {
          id: index, // Asigna un nuevo id con uuidv4()
          filePreview: item,
          file:null

        };
      }));
    }
  }, [imagesProduct]);
  

 
  const handleClose = () => {
    setOpen(false);
    if (imagesProduct !== null) {
        setImages(imagesProduct.map((item, index) => {
          return {
            id: index, // Asigna un nuevo id con uuidv4()
            filePreview: item,
            file:''
  
          };
        }));
      }
    setloader(false);
  };

  const deleteImage=(id)=>{
    let filteredImages=images.filter(image=>image.id !== id);
    setImages(filteredImages);
}

const handleImageChange = (e) => {
    setloader(true);
    e.preventDefault();
  
    let file = e.target.files[0];
    if (!file) {
      setloader(false); // Si no hay archivo seleccionado, desactiva el loader y termina
      return;
    }
  
    let filePreview = URL.createObjectURL(file);
  
    if (images.length === 5) {
      setloader(false); // Si ya tienes 3 imágenes, desactiva el loader y termina
      return;
    }
  
    setImages((prev) => [
      ...prev,
      {
        id: prev.length, // Usamos el índice como id
        file,
        filePreview
      }
    ]);
  
    setloader(false);
  };
  

  const handleSaveImage = () => {
     onSubmit(idProduct, images);
    handleClose();
  };


  if (loader) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }
  
  return (
   
    <div>
      <Card variant="elevation">
        <CardMedia>
          {open ? (
            <Skeleton variant="rectangular" width={250} height={"300px"} />
          ) : images !== null ? (
            <ImageList sx={{ width: 500, height: 450 }}>
              {images?.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item.filePreview}`}
                    alt={index}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ):(
            <img src={noImage} alt="No image available" />
          )}
        </CardMedia>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={images ? <Edit /> : <CloudUpload />}
            onClick={() => handleOpen()}
          >
            {images ? "Editar " : "Subir "}
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container display={"flex"} justifyContent={"end"} spacing={0}>
            <Fab
              color="primary"
              aria-label="Cancelar"
              sx={{ alignContent: "flex-end" }}
              title="Cancelar"
              onClick={() => handleClose()}
            >
              <Close />
            </Fab>
          </Grid>
          <Card variant="outlined">
            <CardMedia>
              <ImageList sx={{ width: 500, height: 450 }}>
                {images.map((item, index) => (
                    
                 <ImageListItem key={index}>
                    <img
                      src={`${item.filePreview}`}
                      alt={index}
                    />
                    <ImageListItem title={"acciones"} position="below">
                      <Button
                        onClick={() => deleteImage(item.id)}
                        variant="contained"
                        color="primary"
                      >
                        Eliminar
                      </Button>
                    </ImageListItem>
                  </ImageListItem>
                ))}
              </ImageList>
            </CardMedia>
            <CardActions>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Agregar
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg "
                  onChange={(e) => handleImageChange(e)}
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudDone />}
                onClick={() => handleSaveImage()}
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

export default DetailImagesUpdateField;
