import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { styled, Card, CardMedia, CardActions, Skeleton, Fab, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { Cancel, Close, CloudDone, CloudUpload, Done, Edit } from "@mui/icons-material";
import noVideo from "../../assets/Images/ui/novideo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

const VideoUpdateField = ({
  videos,
  idProduct,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if(videos.length > 0){
        setvideoPreview(videos[0])
    } 
    setOpen(false)};
  const [videoPreview, setvideoPreview] = useState(null);
  const [fileVideo, setFileVideo] = useState([]);

  useEffect(() => {
    if (videos !== null) {
      setvideoPreview(videos);
    }
  }, [videos]);

  const handleUploadVideo = (event) => {
    setloader(true);
    event.preventDefault();
    const file = event.target.files[0];
    setFileVideo(file);
    const videoUrl = URL.createObjectURL(file);
    setvideoPreview(videoUrl);
    setloader(false);
  };

  const handleSaveVideo  = () => {
     onSubmit(idProduct,fileVideo),
     setFileVideo([])
     handleClose()
  }


  return (
    <div>
      <Card variant="outlined">
        <CardMedia>
          <CardMedia>
            {open ? (
              <Skeleton variant="rectangular" width={250} height={'300px'}/>
            ) : videoPreview !== null ? (
              <video width="250" src={videoPreview} controls />
            ) : (
              <img src={noVideo} alt="No video available" />
            )}
          </CardMedia>
        </CardMedia>
        <CardActions>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={videoPreview ? <Edit /> : <CloudUpload />}
            onClick={() => handleOpen()}
          >
            {videoPreview ? "Editar video" : "Subir video"}
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
            <Grid container display={'flex'} justifyContent={'end'} spacing={0}>   
            <Fab
              color="primary"
              aria-label="Cancelar"
              sx={{alignContent:'flex-end'}}
              title="Cancelar"
              onClick={() => handleClose()}
              
            >
              <Close />
            </Fab>
            </Grid>
          <Card variant="outlined">
            <CardMedia>
              {loader ? (
                <Skeleton />
              ) : videoPreview !== null ? (
                <video width="250" src={videoPreview} controls />
              ) : (
                <img src={noVideo} alt="No video available" />
              )}
            </CardMedia>
            <CardActions>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Editar
                <VisuallyHiddenInput
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => handleUploadVideo(e)}
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudDone/>}
                onClick={() => handleSaveVideo()}
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

export default VideoUpdateField;
