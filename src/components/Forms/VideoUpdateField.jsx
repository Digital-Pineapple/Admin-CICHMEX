import React, { useEffect, useState } from "react";
import { Typography, Button, Grid, styled } from "@mui/material";
import { VideoCallSharp } from "@mui/icons-material";
import useVideos from "../../hooks/useVideos";
import LoadingVideoUpload from "../ui/LoadingVideoUpload";
import { useProducts } from "../../hooks";

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

const VideoUploadField = ({ videosIniciales = [], idProduct }) => {
  const { 
    deleteVideoDetail, 
    handleSubmitVideo, 
    setInitialVideos, 
    error, 
    isLoading 
  } = useVideos();

  const {product} =useProducts()
  const videos = product.videos
  const [videoStates, setVideoStates] = useState({ videoVertical: null, videoHorizontal: null });

  // Inicializa los videos cuando el componente se monta
  useEffect(() => {
    if (videosIniciales?.length > 0) {
      setInitialVideos(videosIniciales); 
    }
  }, [videosIniciales, setInitialVideos]);

  // Actualiza los videos locales cada vez que `videos` cambie
  useEffect(() => {
    const { videoVertical, videoHorizontal } = valuateVideo(videos);
    setVideoStates({ videoVertical, videoHorizontal });
  }, [videos]);

  const valuateVideo = (videos) => {
    if (videos?.length > 0) {
      const videoVertical = videos.find(({ type }) => type === "vertical");
      const videoHorizontal = videos.find(({ type }) => type === "horizontal");
      return { videoVertical, videoHorizontal };
    }
    return { videoVertical: null, videoHorizontal: null };
  };

  const { videoVertical, videoHorizontal } = videoStates;

  if (isLoading) {
    return <LoadingVideoUpload />;
  }

  return (
    <Grid container spacing={2} alignContent="center" justifyContent="center">
      {/* Video Vertical */}
      <Grid item xs={12} md={6}>
        {!videoVertical ? (
          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<VideoCallSharp />}
            disabled={isLoading}
          >
            Subir video vertical
            <VisuallyHiddenInput
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => handleSubmitVideo(idProduct, e, "vertical")}
            />
          </Button>
        ) : (
          <Grid container width="100%">
            <video style={{ maxWidth: "200px", margin: "auto" }} controls>
              <source src={videoVertical?.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button
              onClick={() => idProduct && videoVertical?._id && deleteVideoDetail(idProduct, videoVertical._id)}
              fullWidth
              sx={{ mt: 1 }}
              variant="contained"
              color="error"
              disabled={isLoading}
            >
              Eliminar video vertical
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Video Horizontal */}
      <Grid item xs={12} md={6}>
        {!videoHorizontal ? (
          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<VideoCallSharp />}
            disabled={isLoading}
          >
            Subir video horizontal
            <VisuallyHiddenInput
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => handleSubmitVideo(idProduct, e, "horizontal")}
            />
          </Button>
        ) : (
          <Grid container width="100%">
            <video style={{ maxWidth: "300px", margin: "auto" }} controls>
              <source src={videoHorizontal?.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button
              onClick={() => idProduct && videoHorizontal?._id && deleteVideoDetail(idProduct, videoHorizontal._id)}
              fullWidth
              sx={{ mt: 1 }}
              variant="contained"
              color="warning"
              disabled={isLoading}
            >
              Eliminar video horizontal
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Error */}
      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Grid>
  );
};

export default VideoUploadField;
