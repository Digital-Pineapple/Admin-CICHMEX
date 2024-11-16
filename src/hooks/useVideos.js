import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { startAddOneVideo, startDeleteOneVideo } from "../store";
import { useDispatch, useSelector } from "react-redux";
const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);
  
  console.log(isLoading);
  

  const deleteVideo = (type) => {
    let filteredVideos = videos.filter((i) => i.type !== type);
    setVideos(filteredVideos);
  };
  const handleVideoChange = (e, type) => {


    const file = e.target.files[0];
    if (!file) {
      setError("No se seleccionó ningún archivo.");
      return;
    }

    if (videos?.length >= 2) {
      setError("No puedes subir más de 2 videos.");
      return;
    }

    const filePreview = URL.createObjectURL(file);
    const videoElement = document.createElement("video");

    videoElement.src = filePreview;
    videoElement.load();

    videoElement.onloadedmetadata = () => {
      const isVertical = videoElement.videoHeight > videoElement.videoWidth;

      if (
        (type === "vertical" && isVertical) ||
        (type === "horizontal" && !isVertical)
      ) {
        setVideos((prev) => [
          ...prev,
          {
            id: uuidv4(),
            file,
            filePreview,
            type: isVertical ? "vertical" : "horizontal",
          },
        ]);
        setError(null); // Limpiar errores si el video es válido
      } else {
        setError(
          "Por favor selecciona un archivo de video válido para el tipo seleccionado."
        );
        URL.revokeObjectURL(filePreview);
      }
    };

    videoElement.onerror = () => {
      setError("Error al cargar el archivo de video.");
      URL.revokeObjectURL(filePreview);
    };
  };

  const handleSubmitVideo = async (id, e, type) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No se seleccionó ningún archivo.");
      return;
    }
  
    if (videos?.length >= 2) {
      setError("No puedes subir más de 2 videos.");
      return;
    }
  
    const filePreview = URL.createObjectURL(file);
    const videoElement = document.createElement("video");
  
    videoElement.src = filePreview;
  
    videoElement.onloadedmetadata = async () => {
      try {
        const isVertical = videoElement.videoHeight > videoElement.videoWidth;
        
        if (
          (type === "vertical" && isVertical) ||
          (type === "horizontal" && !isVertical)
        ) {
          
          await dispatch(startAddOneVideo(id, type, file));
          setError(null); // Limpiar errores si el video es válido
        } else {
          setError(
            "Por favor selecciona un archivo de video válido para el tipo seleccionado."
          );
          URL.revokeObjectURL(filePreview); // Liberar URL si no es válido
        }
      } catch (error) {
        setError("Ocurrió un error al procesar el archivo de video.");
      } finally {
        URL.revokeObjectURL(filePreview); // Siempre liberar la URL
      }
    };
  
    videoElement.onerror = () => {
      setError("Error al cargar el archivo de video.");
      URL.revokeObjectURL(filePreview); // Liberar la URL en caso de error
    };
  
    videoElement.load(); // Esto es necesario para disparar el onloadedmetadata
  };
  
  function videoFiles() {
    let files = videos.map((item) => ({ file: item.file, type: item.type }));
    return files;
  }
  
  function videosPreview() {
    let files = videos.map((item) => item.filePreview);
    return files;
  }

  const setInitialVideos = (initialVideos) => {
    setVideos(initialVideos);
  };

  const deleteVideoDetail = async (id, video_id) => await dispatch(startDeleteOneVideo(id,video_id));


  return {
    videos,
    deleteVideo,
    handleVideoChange,
    videoFiles,
    videosPreview,
    error,
    setInitialVideos,
    deleteVideoDetail,
    handleSubmitVideo,
    isLoading
  };
};

export default useVideos;
