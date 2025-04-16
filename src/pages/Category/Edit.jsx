import TextField from "@mui/material/TextField";
import {
  Button,
  Typography,
  Grid2,
  IconButton,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { Controller, useForm } from "react-hook-form";
import {
  Delete,
  UploadFileRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { orange } from "@mui/material/colors";
import { name } from "dayjs/locale/es";

const Edit = ({ handleClose, category }) => {
  const { navigate, dispatch, editCategory } = useCategories();

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: category?.name || '',
      image: {
        filePreview: category?.category_image || '',
        file: null,
      },
    }
  });

  // Función para cerrar el formulario
  const outCreate = () => {
    handleClose();
  };

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    if (e.image.filePreview.startsWith('https://')) {
      // Editar categoría con imagen existente
      editCategory(category._id, { name: e.name, category_image: e.image.filePreview }, handleClose);
    } else {
      // Editar categoría con nueva imagen
      editCategory(category._id, { name: e.name, category_image: e.image.file }, handleClose);
    }
  };

  // Observa el valor actual de la imagen
  const currentImage = watch("image.filePreview");

  // Función para manejar el cambio de imagen
  const onChangeImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validación básica del archivo
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("El formato de imagen no es válido");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen debe ser menor a 10MB");
      return;
    }

    // Generar una vista previa de la imagen
    const filePreview = URL.createObjectURL(file);
    setValue("image.filePreview", filePreview);
    setValue("image.file", file);
  };

  // Función para eliminar la imagen seleccionada
  const removeImage = () => {
    setValue('image.filePreview', null);
  };

  return (
    <Grid2
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario
      style={{ display: "flex", justifyContent: "center" }}
      gap={1}
    >
      {/* Título del formulario */}
      <Grid2 size={12} minHeight={"80px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: '40px' }}
        >
          Editar {category.name ? category.name : ''}
        </Typography>
      </Grid2>

      {/* Campo de texto para el nombre */}
      <Grid2 size={12}>
        <Controller
          control={control}
          rules={{
            required: "Campo requerido",
          }}
          name={`name`}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Nombre*"
              size="small"
              autoComplete="off"
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
          )}
        />
      </Grid2>

      {/* Sección para subir o mostrar la imagen */}
      <Grid2 display={"flex"} size={12}>
        <Grid2
          container
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          width={"100%"}
        >
          <Grid2 size={12}>
            <Controller
              control={control}
              rules={{
                required: "Campo requerido*",
              }}
              name={`image.filePreview`}
              render={({ field: { name, ref, onBlur } }) => {
                const [isDragging, setIsDragging] = useState(false);

                // Manejo de arrastrar y soltar archivos
                const handleDragOver = (event) => {
                  event.preventDefault();
                  setIsDragging(true);
                };

                const handleDragLeave = () => {
                  setIsDragging(false);
                };

                const handleDrop = (event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  const droppedFiles = event.dataTransfer.files;
                  if (droppedFiles.length) {
                    onChangeImage({ target: { files: droppedFiles } });
                  }
                };

                return (
                  <Grid2
                    display={!currentImage ? "flex" : "none"} // Mostrar solo si no hay imagen actual
                    flexDirection="column"
                    alignItems="center"
                    component="label"
                    htmlFor={`imageInput`}
                    sx={{ cursor: "pointer" }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {/* Área para subir imagen */}
                    <Box
                      sx={{
                        position: "relative",
                        backgroundColor: isDragging
                          ? "secondary.main"
                          : !!errors?.image?.filePreview
                            ? "error.dark"
                            : orange[200],
                        width: "100%",
                        minHeight: "150px",
                        padding: "30px 70px",
                        borderRadius: "20px",
                        border: "2px dashed rgb(224, 115, 13)",
                        textAlign: "center",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: orange[400],
                          border: "2px dashedrgb(250, 142, 0)",
                        },
                      }}
                    >
                      <Typography variant="body2" color="inherit">
                        <UploadFileRounded />{" "}
                        <strong>
                          Seleccionar o arrastrar los archivos aquí
                        </strong>
                        <br />
                        Sube tu imagen en WPEG, JPEG o PNG, con una resolución
                        mínima de 50 píxeles en ambos lados y hasta 10 MB de
                        peso.
                      </Typography>
                      <input
                        id={`imageInput`}
                        type="file"
                        ref={ref}
                        onBlur={onBlur}
                        name={name}
                        onChange={(e) => onChangeImage(e)}
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg, image/wpeg"
                      />
                    </Box>
                    <FormControl>
                      <FormHelperText error={!!errors?.image?.filePreview}>
                        {errors?.image?.filePreview?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid2>
                );
              }}
            />
          </Grid2>

          {/* Vista previa de la imagen seleccionada */}
          <Grid2
            size={12}
            display={currentImage ? "flex" : "none"} // Mostrar solo si hay imagen actual
            alignContent={"center"}
            flexDirection={"row"}
          >
            <Grid2
              position="relative"
              border="1px solid #ccc"
              borderRadius="4px"
              overflow="hidden"
              marginX={1}
            >
              <img
                src={currentImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Botón para eliminar la imagen */}
              <Box display="flex" justifyContent="space-between" mt={1}>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "red",
                    backgroundColor: "white",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Botones de acción */}
      <Grid2 display={"flex"} gap={2} size={6}>
        <Button
          onClick={() => outCreate()} // Botón para salir del formulario
          variant="contained"
          fullWidth
          size="large"
          color="warning"
        >
          Salir
        </Button>
        <Button type="submit" fullWidth variant="contained" color="success">
          Guardar
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Edit;
