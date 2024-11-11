import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const deleteVideo = (id) => {
    let filteredVideos = videos.filter((i) => i.id !== id);
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

  function videoFiles() {
    let files = videos.map((item) => item.file);
    return files;
  }
  function videosPreview() {
    let files = videos.map((item) => item.filePreview);
    return files;
  }

  return {
    videos,
    deleteVideo,
    handleVideoChange,
    videoFiles,
    videosPreview,
  };
};

export default useVideos;
