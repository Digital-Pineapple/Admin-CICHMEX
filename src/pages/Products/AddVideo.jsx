import React, { useEffect } from "react";
import { Typography, Button, Grid, styled } from "@mui/material";
import { ArrowBack, VideoCallSharp } from "@mui/icons-material";
import useVideos from "../../hooks/useVideos";
import { useProducts } from "../../hooks";
import { useParams } from "react-router-dom";
import LoadingVideoUpload from "../../components/ui/LoadingVideoUpload";

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

const AddVideo = () => {
  const {
    deleteVideoDetail,
    handleSubmitVideo,
    error,
    isLoading,
  } = useVideos();
  const { id } = useParams();
  const { product, loadProduct, navigate } = useProducts();

  useEffect(() => {
    if (id) loadProduct(id);
  }, []);


  const valuateVideo = (videos) => {
    if (videos?.length > 0) {
      const videoVertical = videos.find(({ type }) => type === "vertical");
      const videoHorizontal = videos.find(({ type }) => type === "horizontal");
      return { videoVertical, videoHorizontal };
    }
    return { videoVertical: null, videoHorizontal: null };
  };

  const { videoVertical, videoHorizontal } = valuateVideo(product.videos);

  if (isLoading) {
    return <LoadingVideoUpload />;
  }

  return (
    <Grid container spacing={2} alignContent="center" justifyContent="center">
      <Grid item xs={12}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/mi-almacen/productos", { replace: true })}
          variant="contained"
          color="primary"
        >
          Salir
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" color="initial">
          Agregar video a producto:{product?.name}
        </Typography>
      </Grid>

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
              onChange={(e) => handleSubmitVideo(id, e, "vertical")}
            />
          </Button>
        ) : (
          <Grid container width="100%">
            <video style={{ maxWidth: "200px", margin: "auto" }} controls>
              <source src={videoVertical?.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button
              onClick={() =>
                id &&
                videoVertical?._id &&
                deleteVideoDetail(id, videoVertical._id)
              }
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
              onChange={(e) => handleSubmitVideo(id, e, "horizontal")}
            />
          </Button>
        ) : (
          <Grid container width="100%">
            <video style={{ maxWidth: "300px", margin: "auto" }} controls>
              <source src={videoHorizontal?.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button
              onClick={() =>
                id &&
                videoHorizontal?._id &&
                deleteVideoDetail(id, videoHorizontal._id)
              }
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

export default AddVideo;
