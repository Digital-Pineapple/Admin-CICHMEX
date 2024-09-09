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

const DetailImagesUpdateField = ({ idProduct, imagesProduct, onSubmit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const handleOpen = () => setOpen(true);
  const [images, setImages]=useState([]);
  useEffect(() => {
    if (imagesProduct !== null) {
      setImages(imagesProduct.map((item) => { 
        return {
          id: item._id, 
          filePreview: item.url,
          file:null

        };
      }));
    }
  }, [imagesProduct]);
 
  const handleClose = () => {
    setOpen(false);
    if (imagesProduct !== null) {
        setImages(imagesProduct.map((item) => {
          return {
            id: item._id,
            filePreview: item.url,
            file:''
  
          };
        }));
      }
    setloader(false);
  };

  const deleteImage=(product_id)=>{
    onDelete(idProduct,product_id)
}

const handleSubmitImage = (e) => {
    setloader(true);
    e.preventDefault();
    let file = e.target.files[0];
    onSubmit(idProduct,file)
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
      <Card sx={{padding:2}} variant="elevation">
        <CardMedia sx={{display:'flex', justifyContent:'center'}}>
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
            fullWidth
          >
            {images ? "Editar imagenes " : "Subir "}
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
          <Card sx={{padding:2}} variant="elevation">
            <CardMedia sx={{display:'flex', justifyContent:'center'}}>
              <ImageList sx={{ width: '100%', height: 450 }}>
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
                        color="warning"
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
                fullWidth
                color="success"
              >
                Agregar
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg "
                  onChange={(e) => handleSubmitImage(e)}
                />
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailImagesUpdateField;
