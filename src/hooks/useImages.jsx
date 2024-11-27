import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const useImages = () => {
    
    const [images, setImages]=useState([]);
    const [errorImage , setErrorImage ]= useState('');

  const [mainImageId, setMainImageId] = useState(null);
    
  const deleteImage = (id) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);
      if (id === mainImageId) {
        setMainImageId(updatedImages[0]?.id || null); // Asignar nueva principal si se elimina
      }
      return updatedImages;
    });
  };
    const handleImageChange=(e)=>{
        let file=e.target.files[0];
        const id = new Date().getTime();
        let filePreview=URL.createObjectURL(file);
        if(images.length === 6){
            return; 
        }else{
            setImages((prevImages) => {
                const newImages = [...prevImages, {
                    id:uuidv4(),
                    file,
                    filePreview
                }];
        
                // Si es la primera imagen, configúrala como principal automáticamente
                if (prevImages.length === 0) {
                  setMainImageId(id);
                  return [newImages[0], ...newImages.slice(1)];
                }
        
                return newImages;
              });
        }
    }
    const handleImageChange2=(e)=>{
        let file=e.target.files[0];
        let filePreview=URL.createObjectURL(file);
        if(images.length === 6){
            return; 
        }else{
            setImages(prev=>([
                ...prev,
                {
                    id:uuidv4(),
                    file,
                    filePreview
                }
            ]));
        }
    }

    function imagesFiles(v){
        let files =images.map((item)=>item.file);
        return files;
    }
    function imagesPreview(v){
        let files =images.map((item)=>item.filePreview);
        return files;
    }

    const moveImage = (index, direction) => {
        setImages((prevImages) => {
          // Evitar que cualquier imagen se mueva a la posición 0 excepto la principal
          if (index === 0 || (index + direction === 0 && mainImageId !== prevImages[index].id)) {
            return prevImages;
          }
      
          const newImages = [...prevImages];
          const [removed] = newImages.splice(index, 1);
          newImages.splice(index + direction, 0, removed);
      
          return newImages;
        });
      };;

      const selectMainImage = (id) => {
        setMainImageId(id);
      
        setImages((prevImages) => {
          const selectedImageIndex = prevImages.findIndex((image) => image.id === id);
          if (selectedImageIndex > -1) {
            const selectedImage = prevImages[selectedImageIndex];
            // Mover la imagen seleccionada como principal a la posición 0
            const updatedImages = [
              selectedImage,
              ...prevImages.filter((image) => image.id !== id),
            ];
            return updatedImages;
          }
          return prevImages;
        });
      };

    return {
        errorImage,
        images,
        handleImageChange,
        deleteImage,
        imagesFiles,
        imagesPreview,
        setImages,
        handleImageChange2,
        moveImage,
        selectMainImage,
        mainImageId
    }


  
}

export default useImages