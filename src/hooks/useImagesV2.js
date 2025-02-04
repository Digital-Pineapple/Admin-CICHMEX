import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useImagesV2 = () => {
  const [images, setImages] = useState([]);
  const addImage = (file) => {
    const image = {
      id: uuidv4(),
      file: file,
    };
    setImages([...images, image]);
  };
  const deleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };
  function imagesFiles() {
    let files = images.map((item) => item.file);
    return files;
  }
  return {
    images,
    addImage,
    deleteImage,
    setImages,
    imagesFiles
  };
};

export default useImagesV2;
