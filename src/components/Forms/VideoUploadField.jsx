import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { VideoCallSharp } from "@mui/icons-material";
import useVideos from "../../hooks/useVideos";
import { useFormik } from "formik";

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

const VideoUploadField = () => {

  const { deleteVideo, handleVideoChange, videoFiles, videos, videosPreview, error } =
    useVideos();

  const valuateVideo = (videos) => {
    if (videos?.length > 0) {
      const videoVertical = videos.find((i) => i.type === "vertical");
      const videoHorizontal = videos.find((i) => i.type === "horizontal");
      return { videoVertical, videoHorizontal };
    }

    // Retornar valores nulos si no hay videos
    return { videoVertical: null, videoHorizontal: null };
  };
  const { videoVertical, videoHorizontal } = valuateVideo(videos);
 
  return (
    <Grid container display={"flex"} spacing={2}  alignContent={'center'} justifyContent={"center"}>
      <Grid
        item
        xs={12}
        md={6}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Typography variant="h6" textAlign="center" >
          Subir video vertical
        </Typography>
        {!videoVertical ? (
          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<VideoCallSharp />}
          >
            Subir video vertical
            <VisuallyHiddenInput
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => handleVideoChange(e, "vertical")}
            />
          </Button>
        ) : (
          <Grid container  width={'100%'}  >
            <video style={{maxWidth:'200px', marginLeft:'auto', marginRight:'auto'}} controls>
              <source src={videoVertical?.filePreview} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button onClick={()=>deleteVideo('vertical') } fullWidth sx={{marginTop:1}} variant="contained" color="error">
              Eliminar video vertical
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Typography variant="h6" textAlign="center">
          Subir video horizontal
        </Typography>
        {!videoHorizontal ? (
          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<VideoCallSharp />}
          >
            Subir video horizontal
            <VisuallyHiddenInput
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => handleVideoChange(e, "horizontal")}
            />
          </Button>
        ) : (
          <Grid container width={'100%'}  >
            <video style={{maxWidth:'300px', marginLeft:'auto', marginRight:'auto'}} controls>
              <source src={videoHorizontal?.filePreview} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
            <Button fullWidth onClick={()=>deleteVideo('horizontal') }  variant="contained" sx={{marginTop:1}} color="warning">
              Eliminar video horizontal
            </Button>
          </Grid>
        )}
      </Grid>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Grid>
  );
};

export default VideoUploadField;
