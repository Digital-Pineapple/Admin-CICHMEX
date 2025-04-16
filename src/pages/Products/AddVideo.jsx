import React, { useState, useEffect, useRef, useMemo } from "react";
import { Typography, Button, Grid, styled } from "@mui/material";
import { ArrowBack, Login, VideoCallSharp } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useVideos from "../../hooks/useVideos";
import { useProducts } from "../../hooks";
import LoadingVideoUpload from "../../components/ui/LoadingVideoUpload";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

// Componente estilizado para ocultar el input de archivo visualmente
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
  // Hooks personalizados para manejar videos y productos
  const { deleteVideoDetail, handleSubmitVideo, error, isLoading, loading } = useVideos();
  const { id } = useParams();
  const { product, loadProduct, navigate } = useProducts();

  // Referencia para la instancia de FFmpeg
  const ffmpegRef = useRef(new FFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.12.6/ffmpeg-core.js",
    wasmOptions: {
      initial: 32, // Memoria inicial en páginas (2MB)
      maximum: 256, // Memoria máxima en páginas (16MB)
    },
  }));

  // Estados para controlar la carga de FFmpeg y la compresión de videos
  const [loaded, setLoaded] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const messageRef = useRef(null);

  // Cargar el producto al montar el componente si existe un ID
  useEffect(() => {
    if (id) loadProduct(id);
  }, []);

  // Función para cargar FFmpeg desde URLs externas
  const loadFFmpeg = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
      console.log(message, 'mensaje');
    });

    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
      });

      console.log("FFmpeg cargado con éxito.");
      setLoaded(true);
    } catch (error) {
      console.error("Error al cargar FFmpeg con toBlobURL:", error);
    }
  };

  // Función para comprimir un video utilizando FFmpeg
  const compressVideo = async (file) => {
    const ffmpeg = ffmpegRef.current;
    if (!loaded) {
      console.error("FFmpeg no está cargado");
      return null;
    }

    try {
      // Escribir el archivo de entrada en FFmpeg
      await ffmpeg.writeFile("input.mp4", await fetchFile(file));

      // Ejecutar el comando de compresión
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vf",
        "scale=320:-2", // Escalar a un ancho más bajo
        "-c:v",
        "libx264",
        "-crf",
        "30", // Compresión mayor
        "-preset",
        "ultrafast", // Velocidad prioritaria
        "-b:v",
        "1000k", // Limitar bitrate
        "-r",
        "15", // Reducir FPS
        "output.mp4",
      ]);

      // Leer el archivo comprimido de salida
      const fileData = await ffmpeg.readFile("output.mp4");
      console.log(fileData);

      return new Blob([fileData.buffer], { type: "video/mp4" });
    } catch (error) {
      console.error("Error al comprimir el video:", error);
      return null;
    }
  };

  // Memorizar los videos verticales y horizontales del producto
  const valuateVideo = useMemo(() => {
    const videoVertical = product?.videos?.find(({ type }) => type === "vertical");
    const videoHorizontal = product?.videos?.find(({ type }) => type === "horizontal");
    return { videoVertical, videoHorizontal };
  }, [product?.videos]);

  // Manejar la subida de videos
  const handleVideoUpload = async (e, type) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // Subir el video directamente (compresión comentada)
    handleSubmitVideo(id, e, type);
  };

  const { videoVertical, videoHorizontal } = valuateVideo;

  // Mostrar un componente de carga si está cargando
  if (isLoading || loading) {
    return <LoadingVideoUpload />;
  }

  return (
    <Grid container spacing={2} alignContent="center" justifyContent="center">
      {/* Botón para salir */}
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

      {/* Título */}
      <Grid item xs={12}>
        <Typography variant="h3" color="initial">
          Agregar video a producto: {product?.name}
        </Typography>
      </Grid>

      {/* Subida de video vertical */}
      <Grid item xs={12} md={6}>
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
              onChange={(e) => handleVideoUpload(e, "vertical")}
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
                id && videoVertical?._id && deleteVideoDetail(id, videoVertical._id)
              }
              fullWidth
              sx={{ mt: 1 }}
              variant="contained"
              color="error"
            >
              Eliminar video vertical
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Subida de video horizontal */}
      <Grid item xs={12} md={6}>
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
              onChange={(e) => handleVideoUpload(e, "horizontal")}
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
                id && videoHorizontal?._id && deleteVideoDetail(id, videoHorizontal._id)
              }
              fullWidth
              sx={{ mt: 1 }}
              variant="contained"
              color="warning"
            >
              Eliminar video horizontal
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Mostrar error si existe */}
      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Grid>
  );
};

export default AddVideo;
