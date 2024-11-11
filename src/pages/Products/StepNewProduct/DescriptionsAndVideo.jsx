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

const DescriptionsAndVideo = ({
  handleNext,
  handleBack,
  index,
  isLastStep,
  setVideoFile
}) => {
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

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: DefaultValues({}) });

  const fieldValues = watch("fields");
  const chips = watch("fields[2].values") || [];
  const [inputValue, setInputValue] = useState("");
  const {dataStep4} =useProducts()

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const newChips = [...chips, inputValue.trim()];
      setValue("fields[2].values", newChips);
      setInputValue("");
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    setValue("fields[2].values", newChips);
  };

  const onChangeVideo = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validateVideoOrientation = (file, onSuccess, onError) => {
      const video = document.createElement("video");

      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src); // Liberar la URL después de cargar metadata
        const isVertical = video.videoHeight > video.videoWidth;
        if (isVertical) {
          onSuccess();
        } else {
          onError("El video debe ser vertical (altura mayor que ancho).");
        }
      };
      video.src = URL.createObjectURL(file);
    };

    validateVideoOrientation(
      file,
      () => {
        // Procesa el video si es vertical
        const filePreview = URL.createObjectURL(file);
        setValue(`videos`, [{ file, filePreview }]);
        setVideoFile(file)
        // Liberar la URL previa si ya existe
        return () => URL.revokeObjectURL(filePreview);
      },
      (errorMessage) => {
        setError(`videos`, { message: errorMessage });
      }
    );
  };

  const videosArray = watch(`videos`) || [];
  const removeVideo = () => {
    setValue(`videos`, []);
  };

  const onSubmit = (data) =>{    
    dataStep4(data)
    handleNext()
    
  }

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader title="Descripción y video" />
      <CardContent>
        <Grid container gap={2} padding={2}>
          {fieldValues?.map((field, index) => (
            <Grid item xs={12} sm={3.5} key={index}>
              {index === 2 ? (
                <>
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

        <Grid
          container
          padding={1}
          spacing={2}
          display="flex"
          direction="row"
          justifyContent="center"
          width={"100%"}
        >
         
            <Grid item xs={videosArray.length > 0 ? 2 :12} alignContent={'center'} >
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
                      onChangeVideo({ target: { files: droppedFiles } }, index);
                    }
                  };

                  return (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      component="label"
                      htmlFor={`videosInput`}
                      sx={{ cursor: "pointer" }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {videosArray.length > 0 ? (
                        <Box
                          sx={{
                            position: "relative",
                            width: "80px",
                            height: "80px",
                            backgroundColor: isDragging ? "#bbdefb" : "#e1f5fe",
                            alignContent: "center",
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
                          <VideoCall style={{ color: "#42a5f5" }} />
                          <Typography
                            variant="body2"
                            color="inherit"
                          ></Typography>
                          <input
                            id={`videosInput`}
                            type="file"
                            ref={ref}
                            onBlur={onBlur}
                            name={name}
                            onChange={(e) => onChangeVideo(e, index)}
                            style={{ display: "none" }}
                            accept="video/mp4"
                          />
                        </Box>
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
                              Seleccionar o arrastrar video aquí
                            </strong>
                            <br />
                            Sube tu video max 10 MB de peso.
                          </Typography>
                          <input
                            id={`videosInput`}
                            type="file"
                            ref={ref}
                            onBlur={onBlur}
                            name={name}
                            onChange={(e) => onChangeVideo(e, index)}
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

            {/* Video Previews */}
            <Grid
              item
              xs={10}
              display="flex"
              flexDirection="row"
            >
              {videosArray.map((preview, i) => (
                <Grid
                  key={i}
                  position="relative"
                  width="200px"
                  height="200px"
                  border="1px solid #ccc"
                  borderRadius="4px"
                  overflow="hidden"
                  marginX={1}
                >
                  <video
                    src={preview.filePreview}
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
                      removeVideo(preview, index, i);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <FormControl>
              <FormHelperText error={!!errors?.videos}>
                {errors?.videos?.message}
              </FormHelperText>

          </FormControl>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={handleBack}>Cancelar</Button>
        <Button variant="contained" type="submit">
          {isLastStep ? "Guardar" : "Continuar"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DescriptionsAndVideo;
