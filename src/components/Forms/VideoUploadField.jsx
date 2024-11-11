import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { VideoCallSharp } from "@mui/icons-material";

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

const VideoUploadField = ({ name, label, setVideo, initialVideo }) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState(null); // Estado para el mensaje de error
  
  useEffect(() => {
    setVideoPreview(initialVideo);
  }, [initialVideo]);

  const handleVideoChange = (e) => {
    
    const file = e.target.files[0];
    setError(null); // Reinicia el mensaje de error

    if (file) {
      const videoURL = URL.createObjectURL(file);
      const videoElement = document.createElement("video");
      videoElement.src = videoURL;

      // Validamos las dimensiones del video
      videoElement.onloadedmetadata = () => {
        if (videoElement.videoHeight > videoElement.videoWidth) {
          // Si el video es vertical
          setVideo(file);
          setVideoPreview(videoURL);
        } else {
          // Si el video es horizontal
          setError("El video debe ser en formato vertical.");
          setVideo(null);
          setVideoPreview(null);
        }
        URL.revokeObjectURL(videoURL); // Liberamos el URL temporal
      };
    }
  };

  const handleVideoCancel = () => {
    setVideo(null);
    setVideoPreview(null);
    setError(null); // Limpia el mensaje de error
  };

  return (
    <Box>
      {!videoPreview ? (
        <Button
          component="label"
          variant="contained"
          fullWidth
          tabIndex={-1}
          startIcon={<VideoCallSharp />}
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            accept="video/mp4"
            onChange={handleVideoChange}
          />
        </Button>
      ) : (
        <Grid
          container
          mt={2}
          gap={2}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography textAlign={"center"} variant="h6" m={2}>
            Vista previa del video:
          </Typography>
          <Grid item xs={12}>
            <video width="250" controls>
              <source src={videoPreview} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </Grid>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleVideoCancel}
            color="warning"
          >
            Cancelar
          </Button>
        </Grid>
      )}
      {error && ( // Muestra el mensaje de error si existe
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default VideoUploadField;
