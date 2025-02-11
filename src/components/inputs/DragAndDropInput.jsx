import {
  Typography,
  Grid2,
  IconButton,
  Box,
  FormHelperText,
} from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import { Delete, UploadFileRounded } from "@mui/icons-material";
import { orange } from "@mui/material/colors";

const DragAndDropInput = ({ name, setValueForm, description, width_image = 1920, height_image = 1080, image_value, fileInputRef }) => {
  const [inputName, setInputName] = useState(name);

  useEffect(() => {
    console.log("Actualizando name en DragAndDropInput:", name);
    setInputName(name);
  }, [name])


  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

  useEffect(() => {
    if (image_value) {
      const objectUrl = URL.createObjectURL(image_value);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image_value]);

  const validateImageSize = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width >= width_image && img.height >= height_image) {
          resolve(true);
        } else {
          reject(`La imagen debe tener un tamaño mínimo de ${width_image} x ${height_image} px.`);
        }
      };
      img.onerror = () => {
        reject("Error al cargar la imagen.");
      };
    });
  }, [width_image, height_image]);

  const onChangeImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setFileError("Tipo de archivo no permitido. Usa JPEG, PNG o WEBP.");
      setValueForm(inputName, null);
      return;
    }
    console.log(inputName, file);

    try {
      await validateImageSize(file);
      setFileError(null);
      
      setValueForm(inputName, file);
    } catch (error) {
      setFileError(error);
      setValueForm(inputName, null);
    }
  };

  const handleDragEvents = (event, isOver) => {
    event.preventDefault();
    setIsDragging(isOver);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) {
      onChangeImage({ target: { files: event.dataTransfer.files } });
    }
  };

  const removeImage = () => {
    setValueForm(inputName, null);
    setPreviewUrl(null);
  };

  const dropZoneStyles = {
    position: "relative",
    backgroundColor: isDragging ? "secondary.main" : orange[200],
    width: "100%",
    minHeight: "150px",
    padding: "30px 70px",
    borderRadius: "20px",
    border: "2px dashed #E0730D",
    textAlign: "center",
    transition: "background-color 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: orange[400],
      border: "2px dashed #FA8E00",
    },
  };

  return (
    <Grid2 container sx={{ width: "100%", margin: "auto", display: 'flex', justifyContent: 'center' }}>
      <Grid2
        container
        direction="column"
        alignItems="center"
        component="label"
        htmlFor="imageInput"
        sx={{ cursor: "pointer" }}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDrop={handleDrop}
        display={previewUrl ? "none" : "block"}
        tabIndex="0"
      >
        <Box sx={dropZoneStyles}>
          <Typography variant="body2">
            <UploadFileRounded /> <strong>Seleccionar o arrastrar archivos aquí</strong>
            <br />
            {description || ' Sube tu imagen en JPEG, PNG o WEBP, mínimo 50px de tamaño y hasta 10MB.'}
          </Typography>
          <input
            id="imageInput"
            type="file"
            ref={fileInputRef}
            onChange={onChangeImage}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/webp"
          />
        </Box>
      </Grid2>

      {previewUrl && (
        <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
          <Box
            sx={{
              position: "relative",
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "red",
                backgroundColor: "white",
                boxShadow: 1,
              }}
              onClick={removeImage}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Grid2>
      )}
      {fileError && (
        <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
          {fileError}
        </FormHelperText>
      )}
    </Grid2>
  );
};

export default DragAndDropInput;
