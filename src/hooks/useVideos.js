import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { startAddOneVideo, startDeleteOneVideo } from "../store";
import { useDispatch, useSelector } from "react-redux";

const useVideos = () => {
  // Estado local para almacenar los videos seleccionados
  const [videos, setVideos] = useState([]);
  // Estado local para manejar errores
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // Selección de estados desde Redux
  const { isLoading } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.ui);

  // Función para eliminar un video según su tipo (vertical u horizontal)
  const deleteVideo = (type) => {
    let filteredVideos = videos.filter((i) => i.type !== type);
    setVideos(filteredVideos);
  };

  // Función para manejar el cambio de archivo de video
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

    // Validar las dimensiones del video para determinar si es vertical u horizontal
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

  // Función para manejar el envío de un video al servidor
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

    // Validar las dimensiones del video y enviarlo al servidor si es válido
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

  // Función para obtener los archivos de video seleccionados
  function videoFiles() {
    let files = videos.map((item) => ({ file: item.file, type: item.type }));
    return files;
  }

  // Función para obtener las vistas previas de los videos seleccionados
  function videosPreview() {
    let files = videos.map((item) => item.filePreview);
    return files;
  }

  // Función para establecer videos iniciales en el estado
  const setInitialVideos = (initialVideos) => {
    setVideos(initialVideos);
  };

  // Función para eliminar un video específico desde el servidor
  const deleteVideoDetail = async (id, video_id) =>
    await dispatch(startDeleteOneVideo(id, video_id));

  return {
    videos, // Lista de videos seleccionados
    deleteVideo, // Función para eliminar un video por tipo
    handleVideoChange, // Función para manejar el cambio de archivo de video
    videoFiles, // Función para obtener los archivos de video
    videosPreview, // Función para obtener las vistas previas de los videos
    error, // Estado de error
    setInitialVideos, // Función para establecer videos iniciales
    deleteVideoDetail, // Función para eliminar un video desde el servidor
    handleSubmitVideo, // Función para manejar el envío de un video
    isLoading, // Estado de carga desde Redux
    loading, // Otro estado de carga desde Redux
  };
};

export default useVideos;
