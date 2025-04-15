import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useImagesV2 = () => {
  // Estado para almacenar las imágenes como un arreglo de objetos
  const [images, setImages] = useState([]);

  // Función para agregar una nueva imagen al estado
  const addImage = (file) => {
    const image = {
      id: uuidv4(), // Genera un identificador único para la imagen
      file: file,   // Archivo de la imagen
    };
    setImages([...images, image]); // Actualiza el estado con la nueva imagen
  };

  // Función para eliminar una imagen del estado usando su id
  const deleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id)); // Filtra las imágenes y elimina la que coincide con el id
  };

  // Función para obtener solo los archivos de las imágenes
  function imagesFiles() {
    let files = images.map((item) => item.file); // Mapea los objetos de imágenes para extraer solo los archivos
    return files; // Retorna un arreglo con los archivos
  }

  // Retorna las funciones y el estado para ser utilizados en otros componentes
  return {
    images,       // Estado actual de las imágenes
    addImage,     // Función para agregar imágenes
    deleteImage,  // Función para eliminar imágenes
    setImages,    // Función para establecer manualmente el estado de imágenes
    imagesFiles   // Función para obtener los archivos de las imágenes
  };
};

export default useImagesV2;
