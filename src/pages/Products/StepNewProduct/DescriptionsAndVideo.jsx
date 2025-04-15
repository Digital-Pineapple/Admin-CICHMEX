import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  TextField,
  Checkbox,
  Chip,
  FormControlLabel,
  Box,
  Typography,
  Button,
  FormHelperText,
  FormControl,
  IconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { VideoCall, Delete } from "@mui/icons-material";
import { useProducts } from "../../../hooks";
import useVideos from "../../../hooks/useVideos";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";

const DescriptionsAndVideo = ({
  handleNext,
  handleBack,
  index,
  isLastStep,
  handleReset
}) => {
  // Valores por defecto para los campos del formulario
  const DefaultValues = (data) => ({
    fields: [
      {
        id: "description",
        name: "Descripción*",
        textInput: data?.description || "",
      },
      {
        id: "shortDescription",
        name: "Descripción corta*",
        textInput: data?.model || "",
        checkbox: false,
      },
      {
        id: "seoKeywords",
        name: "Palabras clave SEO",
        textInput: "",
        values: data?.seoKeywords || [],
      },
    ],
    videos: data.videos || [],
  });

  // Configuración del formulario con react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: DefaultValues({}) });

  // Hook personalizado para manejar videos
  const { videos, handleVideoChange, error, deleteVideo } = useVideos();

  // Observa los valores de los campos del formulario
  const fieldValues = watch("fields");
  const chips = watch("fields[2].values") || [];
  const [inputValue, setInputValue] = useState("");
  const { completeStepAddProduct, dataProduct, loading } = useProducts();

  // Maneja la adición de chips al presionar Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const newChips = [...chips, inputValue.trim()];
      setValue("fields[2].values", newChips);
      setInputValue("");
    }
  };

  // Maneja la eliminación de chips
  const handleDelete = (chipToDelete) => () => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    setValue("fields[2].values", newChips);
  };

  // Maneja el envío del formulario
  const onSubmit = (data) => {
    // Procesa los datos del formulario
    const info = () => {
      let newValues = {};
      data.fields.forEach((i) => {
        if (i.id === 'description') {
          newValues.description = i.textInput; // Asignación correcta
        }
        if (i.id === 'shortDescription') {
          newValues.shortDescription = i.textInput; // Asignación correcta
        }
        if (i.id === 'seoKeywords') {
          newValues.keywords = i.values; // Asignación correcta
        }
      });
      return newValues;
    };

    // Combina los datos del formulario con los videos
    const allInfo = {
      ...info(),
      videos : [...videos]
    };

    // Completa el paso actual del producto
    completeStepAddProduct(dataProduct._id ,allInfo, handleReset);
  };

  // Filtra los videos por tipo (vertical u horizontal)
  const videoVertical = videos.filter((i) => i.type === "vertical");
  const videoHorizontal = videos.filter((i) => i.type === "horizontal");

  // Muestra una pantalla de carga si está cargando
  if (loading) {
    return (
      <LoadingScreenBlue/>
    );
  }

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title="Descripción y video" />
      <CardContent>
        <Grid container gap={2} padding={2}>
          {/* Renderiza los campos del formulario */}
          {fieldValues?.map((field, index) => (
            <Grid item xs={12} sm={3.5} key={index}>
              {index === 2 ? (
                <>
                  {/* Campo de entrada para palabras clave SEO */}
                  <TextField
                    value={inputValue}
                    size="small"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    label={field.name}
                    fullWidth
                    rules={{
                      required: {
                        value: !field.checkbox,
                        message: `${field.name} es requerido`,
                      },
                    }}
                  />
                  {/* Lista de chips para palabras clave */}
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}
                  >
                    {chips.map((chip, i) => (
                      <Chip
                        key={i}
                        label={chip}
                        onDelete={handleDelete(chip)}
                      />
                    ))}
                  </Box>
                </>
              ) : (
                <Controller
                  name={`fields[${index}].textInput`}
                  control={control}
                  rules={{
                    required: {
                      value: !field.checkbox,
                      message: `${field.name} es requerido`,
                    },
                  }}
                  render={({ field: textField }) => (
                    <TextField
                      {...textField}
                      fullWidth
                      size="small"
                      label={field.name}
                      multiline // Permite convertirlo en un textarea
                      rows={4} // Número de filas visibles en el textarea
                      error={!!errors.fields?.[index]?.textInput}
                      helperText={errors.fields?.[index]?.textInput?.message}
                      disabled={field.checkbox}
                    />
                  )}
                />
              )}

              {/* Checkbox para marcar como "No aplica" */}
              {field.checkbox && (
                <Controller
                  name={`fields[${index}].checkbox`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) =>
                            setValue(`fields[${index}].textInput`, "")
                          }
                        />
                      }
                      label="No aplica"
                    />
                  )}
                />
              )}
            </Grid>
          ))}
        </Grid>

        {/* Sección para subir videos */}
        <Grid
          container
          padding={1}
          spacing={2}
          display={'flex'}
          direction="row"
          justifyContent="center"
          width={"100%"}
        >
          {/* Subida de video vertical */}
          <Grid item display={!!videoVertical[0] ? 'none':'block'} xs={6} alignContent={"center"}>
            <Controller
              control={control}
              name={`videos`}
              render={({ field: { name, ref, onBlur } }) => {
                const [isDragging, setIsDragging] = useState(false);

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
                    handleVideoChange(
                      { target: { files: droppedFiles } },
                      "vertical"
                    );
                  }
                };

                return (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    component="label"
                    htmlFor={`videoVerticalInput`}
                    sx={{ cursor: "pointer" }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                      <Box
                        sx={{
                          position: "relative",
                          backgroundColor: isDragging ? "#bbdefb" : "#e1f5fe",
                          width: "100%",
                          minHeight: "150px",
                          padding: "30px 70px",
                          borderRadius: "20px",
                          border: "2px dashed #bbdefb",
                          boxShadow: "0px 0px 200px -50px #90caf9",
                          textAlign: "center",
                          transition: "background-color 0.3s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#bbdefb",
                            border: "2px dashed #42a5f5",
                          },
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          <VideoCall style={{ color: "#42a5f5" }} />
                          <strong style={{ color: "#42a5f5" }}>
                            Seleccionar o arrastrar vertical video aquí
                          </strong>
                          <br />
                          Sube tu video max 10 MB de peso.
                        </Typography>
                        <input
                          id={`videoVerticalInput`}
                          type="file"
                          ref={ref}
                          onBlur={onBlur}
                          name={name}
                          onChange={(e) => handleVideoChange(e, "vertical")}
                          style={{ display: "none" }}
                          accept="video/mp4"
                        />
                      </Box>
                  </Box>
                );
              }}
            />
          </Grid>

          {/* Subida de video horizontal */}
          <Grid item display={!!videoHorizontal[0] ? 'none':'block'} xs={6} alignContent={"center"}>
            <Controller
              control={control}
              name={`videos`}
              render={({ field: { name, ref, onBlur } }) => {
                const [isDragging, setIsDragging] = useState(false);

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
                    handleVideoChange(
                      { target: { files: droppedFiles } },
                      "horizontal"
                    );
                  }
                };

                return (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    component="label"
                    htmlFor={`videoHorizontalInput`}
                    sx={{ cursor: "pointer" }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!!videoHorizontal[0] ? (
                      ""
                    ) : (
                      <Box
                        sx={{
                          position: "relative",
                          backgroundColor: isDragging ? "#bbdefb" : "#e1f5fe",
                          width: "100%",
                          minHeight: "150px",
                          padding: "30px 70px",
                          borderRadius: "20px",
                          border: "2px dashed #bbdefb",
                          boxShadow: "0px 0px 200px -50px #90caf9",
                          textAlign: "center",
                          transition: "background-color 0.3s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#bbdefb",
                            border: "2px dashed #42a5f5",
                          },
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          <VideoCall style={{ color: "#42a5f5" }} />
                          <strong style={{ color: "#42a5f5" }}>
                            Seleccionar o arrastrar Horizontal video aquí
                          </strong>
                          <br />
                          Sube tu video max 10 MB de peso.
                        </Typography>
                        <input
                          id={`videoHorizontalInput`}
                          type="file"
                          ref={ref}
                          onBlur={onBlur}
                          name={name}
                          onChange={(e) => handleVideoChange(e, "horizontal")}
                          style={{ display: "none" }}
                          accept="video/mp4"
                        />
                      </Box>
                    )}
                  </Box>
                );
              }}
            />
          </Grid>

          {/* Vista previa y eliminación de video horizontal */}
          <Grid item xs={6} display={!!videoHorizontal[0] ? 'flex':'none'} alignItems={'center'} alignContent={'center'} flexDirection="column">
            <Typography variant="body1" textAlign={'center'}  color="inherit">Video Horizontal</Typography>
            <Grid
              position="relative"
              width="300px"
              height="300px"
              border="1px solid #ccc"
              borderRadius="4px"
              overflow="hidden"
              marginX={1}
            >
              <video
                src={videoHorizontal[0]?.filePreview}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
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
                  deleteVideo("horizontal");
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>

          {/* Vista previa y eliminación de video vertical */}
          <Grid item xs={6}  display={!!videoVertical[0] ? 'flex':'none'} alignItems={'center'} alignContent={'center'} flexDirection="column">
            <Typography variant="body1" textAlign={'center'}  color="inherit">Video vertical</Typography>
            <Grid
              position="relative"
              width="250px"
              height="250px"
              border="1px solid #ccc"
              borderRadius="4px"
              overflow="hidden"
              marginX={1}
            >
              <video
                src={videoVertical[0]?.filePreview}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
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
                  deleteVideo("vertical");
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>

          {/* Mensaje de error para videos */}
          <FormControl>
            <FormHelperText error={!!error}>{error}</FormHelperText>
          </FormControl>
        </Grid>
      </CardContent>
      <CardActions>
        {/* Botón para continuar o guardar */}
        <Button variant="contained" type="submit">
          {isLastStep ? "Guardar" : "Continuar"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DescriptionsAndVideo;
