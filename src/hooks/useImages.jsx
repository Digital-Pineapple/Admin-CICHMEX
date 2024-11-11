import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const useImages = () => {
    
    const [images, setImages]=useState([]);
    const [errorImage , setErrorImage ]= useState('');
    
    const deleteImage=(id)=>{
        let filteredImages=images.filter(image=>image.id !== id);
        setImages(filteredImages);
    }
    const handleImageChange=(e)=>{
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

    function imagesFiles(){
        let files =images.map((item)=>item.file);
        return files;
    }
    function imagesPreview(){
        let files =images.map((item)=>item.filePreview);
        return files;
    }

    return {
        errorImage,
        images,
        handleImageChange,
        deleteImage,
        imagesFiles,
        imagesPreview,
        setImages
    }


  
}

export default useImages