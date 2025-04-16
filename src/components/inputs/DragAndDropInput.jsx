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

// Componente principal para manejar la funcionalidad de arrastrar y soltar imágenes
const DragAndDropInput = ({ name, setValueForm, description, width_image = 1920, height_image = 1080, image_value, fileInputRef }) => {
  // Estado para manejar el nombre del input
  const [inputName, setInputName] = useState(name);

  // Actualiza el nombre del input cuando cambia la prop `name`
  useEffect(() => {
    console.log("Actualizando name en DragAndDropInput:", name);
    setInputName(name);
  }, [name]);

  // Estado para manejar si el área de arrastrar está activa
  const [isDragging, setIsDragging] = useState(false);
  // Estado para manejar errores relacionados con el archivo
  const [fileError, setFileError] = useState(null);
  // Estado para manejar la URL de vista previa de la imagen
  const [previewUrl, setPreviewUrl] = useState(null);
  // Tipos de archivos permitidos
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

  // Efecto para generar una URL de vista previa cuando se proporciona una imagen
  useEffect(() => {
    if (image_value) {
      const objectUrl = URL.createObjectURL(image_value);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image_value]);

  // Función para validar el tamaño de la imagen
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

  // Maneja el cambio de imagen cuando se selecciona un archivo
  const onChangeImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verifica si el tipo de archivo es válido
    if (!allowedTypes.includes(file.type)) {
      setFileError("Tipo de archivo no permitido. Usa JPEG, PNG o WEBP.");
      setValueForm(inputName, null);
      return;
    }
    console.log(inputName, file);

    try {
      // Valida el tamaño de la imagen
      await validateImageSize(file);
      setFileError(null);
      setValueForm(inputName, file);
    } catch (error) {
      setFileError(error);
      setValueForm(inputName, null);
    }
  };

  // Maneja los eventos de arrastrar y soltar
  const handleDragEvents = (event, isOver) => {
    event.preventDefault();
    setIsDragging(isOver);
  };

  // Maneja el evento de soltar un archivo en el área de arrastrar
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) {
      onChangeImage({ target: { files: event.dataTransfer.files } });
    }
  };

  // Elimina la imagen seleccionada
  const removeImage = () => {
    setValueForm(inputName, null);
    setPreviewUrl(null);
  };

  // Estilos para el área de arrastrar y soltar
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
      {/* Área de arrastrar y soltar */}
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
          {/* Input oculto para seleccionar archivos */}
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

      {/* Vista previa de la imagen seleccionada */}
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
            {/* Botón para eliminar la imagen */}
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
      {/* Mensaje de error si ocurre algún problema */}
      {fileError && (
        <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
          {fileError}
        </FormHelperText>
      )}
    </Grid2>
  );
};

export default DragAndDropInput;
