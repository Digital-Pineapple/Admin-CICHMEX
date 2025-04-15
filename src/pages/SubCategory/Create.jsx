import TextField from "@mui/material/TextField";
import {
  Button,
  Typography,
  Grid2,
  IconButton,
  FormControl,
  FormHelperText,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { Controller, useForm } from "react-hook-form";
import { Delete, UploadFileRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { orange } from "@mui/material/colors";
import { useSubCategories } from "../../hooks/useSubCategories";

const CreateSubCategory = ({ handleClose, categories, subCategory }) => {
  const { addSubCategory } = useSubCategories();

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    resetField,
  } = useForm({
    defaultValues: {
      name: "",
      category_id: "",
      image: {
        filePreview: null,
        file: null,
      },
    },
  });

  // Función para limpiar el formulario y cerrar el modal
  const outCreate = () => {
    reset();
    handleClose();
  };

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    addSubCategory(
      {
        name: e.name,
        category_id: e.category_id,
        subCategory_image: e.image.file,
      },
      handleClose
    );
  };

  // Observa el valor actual de la imagen
  const currentImage = watch("image.filePreview");

  // Maneja el cambio de imagen y genera una vista previa
  const onChangeImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const filePreview = URL.createObjectURL(file);
    setValue("image.filePreview", filePreview);
    setValue("image.file", file);

    return () => {
      URL.revokeObjectURL(filePreview);
    };
  };

  // Elimina la imagen seleccionada
  const removeImage = () => {
    resetField("image");
  };

  return (
    <Grid2
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", justifyContent: "center" }}
      gap={1}
    >
      {/* Título del formulario */}
      <Grid2 size={12} minHeight={"60px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Crear SubCategoria
        </Typography>
      </Grid2>

      {/* Campo para el nombre de la subcategoría */}
      <Grid2 my={1} size={12}>
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

      {/* Selector de categoría */}
      <Grid2 size={12}>
        <Controller
          control={control}
          name="category_id"
          rules={{
            required: { message: "Campo requerido", value: true },
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                {...field}
                id="category_id "
                label="Categoria"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.category_id}
                helperText={errors.category_id && errors.category_id.message}
                autoComplete="off"
              >
                {categories.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "error.main" }}>
                {errors?.category_id?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Campo para subir imagen */}
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
              name={`image.file`}
              render={({ field: { name, ref, onBlur } }) => {
                const [isDragging, setIsDragging] = useState(false);

                // Maneja el evento de arrastrar sobre el área de carga
                const handleDragOver = (event) => {
                  event.preventDefault();
                  setIsDragging(true);
                };

                // Maneja el evento de salir del área de carga
                const handleDragLeave = () => {
                  setIsDragging(false);
                };

                // Maneja el evento de soltar archivos en el área de carga
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
                    display={!currentImage ? "flex" : "none"}
                    flexDirection="column"
                    alignItems="center"
                    component="label"
                    htmlFor={`imageInput`}
                    sx={{ cursor: "pointer" }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        backgroundColor: isDragging
                          ? "secondary.main"
                          : !!errors?.image?.file
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
                      <FormHelperText error={!!errors?.image?.file}>
                        {errors?.image?.file?.message}
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
            display={currentImage ? "flex" : "none"}
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
      <Grid2 display={"flex"} gap={2} size={12}>
        <Button
          onClick={outCreate}
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

export default CreateSubCategory;
