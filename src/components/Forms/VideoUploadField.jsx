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
 useEffect(() => {
   setVideoPreview(initialVideo)
 }, [initialVideo])
 
  
  
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get the file object from the event
    setVideo(file); // Set the file object using the provided setter function
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleVideoCancel = () => {
    setVideo(null);
    setVideoPreview(null);
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
          alignItems={'center'}
        >
          <Typography textAlign={"center"} variant="h6" m={2}>
            Vista previa del video:
          </Typography>
          <Grid item xs={12}>
          <video width="250" controls  >
            <source src={videoPreview} type="video/mp4"  />
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
    </Box>
  );
};

export default VideoUploadField;
