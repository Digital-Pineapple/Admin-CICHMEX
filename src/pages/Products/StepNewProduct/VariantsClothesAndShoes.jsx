import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import {
  Add,
  Close,
  Delete,
  DeleteOutline,
  DeleteRounded,
  ExpandLess,
  ExpandMore,
  NavigateBefore,
  NavigateNext,
  OpenInFull,
  Star,
  UploadFile,
  VideoCall,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListSubheader,
  ListItemText,
  Chip,
  ListItem,
  Grid2,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  IconButton,
  Modal,
  Fab,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import ColorSelector from "../../../components/inputs/ColorSelector";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { useProducts } from "../../../hooks";
import { v4 as uuidv4 } from "uuid";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #bbdefb",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
};

const VariantsClothesAndShoes = ({
  handleNext,
  handleBack,
  index,
  isLastStep,
}) => {
  const { dataStep4, dataProduct, loading, dataClothesShoes } = useProducts();
  const [collapseOpen, setCollapseOpen] = useState([]); // Array to track the open/close state of each variant
  const [open, setOpen] = useState({ image: null, value: false });
  const { sizeGuide } = useSizeGuide();
  const handleOpen = (image) => {
    setOpen({ image: image, value: true });
  };

  const handleClose = () => setOpen({ image: null, value: false });
  const DefaultValues = () => ({
    variants: [],
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
    unregister,
  } = useForm({ defaultValues: DefaultValues() });

  const handleCheckboxChange = (variant, checked, index) => {
    setValue(`variants[${index}].design.checkbox`, checked);

    if (checked) {
      setValue(`variants[${index}].design.textInput`, ""); // Limpia el campo relacionado
    }
  };

  const valueVariants = watch("variants") || [];
  const handleAddVariant = () => {
    const newId = uuidv4();
    setValue("variants", [
      ...valueVariants,
      {
        id: newId, // ID único
        design: { textInput: "", checkbox: false },
        color: "",
        images: [],
        sizes: [],
      },
    ]);
  };

  const handleAddSize = (variantId) => {
    const newId = uuidv4(); // Genera un ID único

    // Obtén las variantes actuales
    const currentVariants = watch("variants") || [];

    // Encuentra la variante correspondiente
    const variantIndex = currentVariants.findIndex(
      (variant) => variant.id === variantId
    );

    if (variantIndex === -1) return; // Si no encuentra la variante, no hace nada

    // Obtén las tallas actuales de la variante
    const currentSizes = currentVariants[variantIndex]?.sizes || [];

    // Crea una nueva talla
    const newSize = {
      id: newId, // ID único para la talla
      weight: "",
      size: "",
      price: "",
      porcentDiscount: "",
      purchase_price: "",
      discountPrice: "",
      stock: null,
    };

    // Actualiza el array de tallas
    const updatedSizes = [...currentSizes, newSize];

    // Establece el nuevo array de tallas en la variante correspondiente
    setValue(`variants[${variantIndex}].sizes`, updatedSizes);

    // Maneja el estado colapsado (si aplica)
    setCollapseOpen([...collapseOpen, { id: newId, value: false }]);
  };

  // Remove variant and its form values
  const MessageDelete = (variantId) => {
    Swal.fire({
      title: "¿Está seguro de eliminar esta variante?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtiene las variantes actuales
        const currentVariants = watch("variants") || [];

        // Filtra las variantes para eliminar la seleccionada
        const updatedVariants = currentVariants.filter(
          (variant) => variant.id !== variantId
        );

        // Actualiza el estado del formulario con las variantes restantes
        setValue("variants", updatedVariants);

        Swal.fire("Se eliminó Correctamente!", "", "success");
      }
    });
  };

  const MessageDeleteSize = (variantId, sizeId) => {
    Swal.fire({
      title: "¿Está seguro de eliminar esta talla?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtiene las variantes actuales
        const currentVariants = watch("variants") || [];

        // Encuentra la variante por ID
        const variantIndex = currentVariants.findIndex(
          (variant) => variant.id === variantId
        );
        if (variantIndex === -1) return;

        // Filtra las tallas para eliminar la seleccionada
        const currentSizes = currentVariants[variantIndex]?.sizes || [];
        const updatedSizes = currentSizes.filter((size) => size.id !== sizeId);

        // Actualiza las tallas de la variante correspondiente
        currentVariants[variantIndex].sizes = updatedSizes;

        // Actualiza el estado del formulario con las variantes modificadas
        setValue("variants", currentVariants);

        Swal.fire("Se eliminó Correctamente!", "", "success");
      }
    });
  };

  const handleClick = (id) => {
    setCollapseOpen((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  };

  const isMain = (value) => {
    if (value === 0) {
      return (
        <ListItem>
          <Chip
            variant="filled"
            size="small"
            color="secondary"
            label="Variante principal"
          ></Chip>
        </ListItem>
      );
    }
  };

  const onChangeImages = (event, indexVariant) => {
    const files = Array.from(event.target.files); // Convierte FileList a un array
    if (!files.length) return;

    const currentImages = watch(`variants[${indexVariant}].images`) || [];

    const availableSlots = 10 - currentImages.length;
    if (availableSlots <= 0) return;

    // Crea un array de objetos con las previsualizaciones y archivos
    const newImages = files.slice(0, availableSlots).map((file) => ({
      filePreview: URL.createObjectURL(file), // Previsualización de la imagen
      file, // Incluye el archivo si necesitas enviarlo al servidor
    }));

    setValue(`variants[${indexVariant}].images`, [
      ...currentImages,
      ...newImages, // Añade las nuevas imágenes
    ]);
  };

  const removeImage = (preview, index, i) => {
    const variantImages = watch(`variants.[${index}].images`);
    let updateImages = variantImages.filter((item, index) => index !== i);
    setValue(`variants.[${index}].images`, updateImages);
  };

  const imagesArray = (indexVariant) => {
    const images = watch(`variants[${indexVariant}].images`);
    return Array.isArray(images) ? images : [];
  };

  const onSubmit = ({ variants }) => {
    Swal.fire({
      title: "¿Esta seguro de guardar estas variantes?",
      showCancelButton: true,
      confirmButtonText: "Si guardar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ff1744",
      confirmButtonColor: "#4caf50",
    }).then((result) => {
      if (result.isConfirmed) {
        dataClothesShoes(dataProduct._id, variants, handleNext);
      }
    });
  };

  const calculateDiscountPrice = (price, porcentDiscount) => {
    const parsedPrice = parseFloat(price); // Asegúrate de que no sea NaN
    const parsedDiscount = parseFloat(porcentDiscount) || 0;
    return parsedPrice - (parsedPrice * parsedDiscount) / 100;
  };

  const handlePriceChange = (e, indexVariant, indexSize) => {
    const { name, value } = e.target;
    const fieldValue = parseFloat(value) || 0; // Convierte a número o usa 0 como predeterminado

    // Obtén los valores actuales del formulario
    let price =
      watch(`variants[${indexVariant}].sizes[${indexSize}].price`) || 0;
    let discount =
      watch(`variants[${indexVariant}]sizes[${indexSize}].porcentDiscount`) ||
      0;

    // Actualiza solo el valor relevante
    if (name.includes("price")) price = fieldValue;
    if (name.includes("porcentDiscount")) discount = fieldValue;

    // Calcula el precio con descuento
    const discountPrice = calculateDiscountPrice(price, discount);

    // Actualiza los valores del formulario
    setValue(`variants[${indexVariant}].sizes[${indexSize}].price`, price);
    setValue(
      `variants[${indexVariant}].sizes[${indexSize}].porcentDiscount`,
      discount
    );
    setValue(
      `variants[${indexVariant}].sizes[${indexSize}].discountPrice`,
      discountPrice
    );
  };

  const moveImage = (indexVariant, indexImage, direction) => {
    // Obtener las imágenes actuales usando getValues
    const images = getValues(`variants[${indexVariant}].images`);

    // Verificar que las imágenes sean un arreglo válido
    if (!Array.isArray(images)) {
      console.error("El valor actual no es un arreglo:", images);
      return;
    }

    // Crear una copia de las imágenes y realizar el movimiento
    const newImages = [...images];
    const [removed] = newImages.splice(indexImage, 1); // Extraer la imagen actual
    newImages.splice(indexImage + direction, 0, removed); // Insertar en la nueva posición

    // Actualizar el campo con el nuevo valor
    setValue(`variants[${indexVariant}].images`, newImages);
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <>
      <Card
        variant="elevation"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardHeader
          title="Variantes y fotos"
          subheader="Suma color, fotos, tallas de la guía seleccionada, cantidad y otros datos específicos para cada variante del producto."
        />
        <CardContent>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddVariant}
          >
            <Add /> Agregar variante
          </Button>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Lista de variantes
              </ListSubheader>
            }
          >
            {valueVariants?.map((item, index) => {
              return (
                <div key={item.id}>
                  <ListItem
                    sx={{
                      bgcolor: "success.dark",
                      borderRadius: "5px",
                      marginY: 1,
                    }}
                    secondaryAction={
                      <Button
                        title="Borrar"
                        sx={{
                          alignContent: "center",
                          maxWidth: "40px",
                          color: "red",
                          "&:hover": {
                            border: "1px solid",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation(), MessageDelete(item.id);
                        }}
                      >
                        <Delete />
                      </Button>
                    }
                    onClick={() => handleClick(item.id)}
                  >
                    <ListItemText
                      sx={{ minWidth: "150px" }}
                      primary={`Variante ${index + 1}`}
                    />
                    {isMain(index)}
                  </ListItem>

                  <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                      <Controller
                        control={control}
                        name={`variants[${index}].color`}
                        rules={{
                          required: {
                            value: !watch(`variants[${item.id}].color`),
                            message: "Campo requerido",
                          },
                        }}
                        render={({ field }) => (
                          <ColorSelector
                            {...field}
                            fullWidth
                            value={watch(`variants.[${index}].color`)}
                            label="Color"
                            error={!!errors.variants?.[index]?.color}
                            helperText={
                              errors.variants?.[index]?.color?.message
                            }
                          />
                        )}
                      />
                    </Grid2>

                    <Grid2 size={6}>
                      <Controller
                        control={control}
                        name={`variants[${index}].design.textInput`}
                        rules={{
                          required: {
                            value: !watch(`variants[${index}].design.checkbox`),
                            message: "Campo requerido",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            disabled={watch(
                              `variants[${index}].design.checkbox`
                            )}
                            label="Diseño"
                            error={
                              !!errors.variants?.[index]?.design?.textInput
                            }
                            helperText={
                              errors.variants?.[index]?.design?.textInput
                                ?.message
                            }
                          />
                        )}
                      />

                      <Controller
                        name={`variants[${index}].design.checkbox`}
                        control={control}
                        render={({ field: { onChange, name } }) => (
                          <FormControlLabel
                            componentsProps={{
                              typography: { variant: "body2" },
                            }}
                            control={
                              <Checkbox
                                sx={{ marginLeft: "10px" }}
                                checked={watch(
                                  `variants[${index}].design.checkbox`
                                )}
                                size="small"
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                  handleCheckboxChange(
                                    `variants[${index}].design.textInput`,
                                    e.target.checked,
                                    index
                                  );
                                }}
                              />
                            }
                            label="No aplica *"
                          />
                        )}
                      />
                    </Grid2>

                    <Grid2 display={"flex"} size={12}>
                      <Grid2
                        container
                        padding={1}
                        spacing={2}
                        display={"flex"}
                        justifyContent={"center"}
                        width={"100%"}
                      >
                        <Grid2 size={imagesArray(index).length > 0 ? 1 : 12}>
                          <Controller
                            control={control}
                            rules={{
                              required: {
                                value: `variants[${index}].images`,
                                message: "Campo requerido",
                              },
                            }}
                            name={`variants[${index}].images`}
                            render={({ field: { name, ref, onBlur } }) => {
                              const [isDragging, setIsDragging] =
                                useState(false);

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
                                  onChangeImages(
                                    { target: { files: droppedFiles } },
                                    index
                                  );
                                }
                              };

                              return (
                                <Box
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                  component="label"
                                  htmlFor={`imagesInput-${index}`}
                                  sx={{ cursor: "pointer" }}
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                >
                                  {imagesArray(index).length > 0 ? (
                                    <Box
                                      sx={{
                                        position: "relative",
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: isDragging
                                          ? "#bbdefb"
                                          : "#e1f5fe",
                                        alignContent: "center",
                                        borderRadius: "20px",
                                        border: "2px dashed #bbdefb",
                                        boxShadow:
                                          "0px 0px 200px -50px #90caf9",
                                        textAlign: "center",
                                        transition:
                                          "background-color 0.3s ease-in-out",
                                        "&:hover": {
                                          backgroundColor: "#bbdefb",
                                          border: "2px dashed #42a5f5",
                                        },
                                      }}
                                    >
                                      <UploadFile
                                        style={{ color: "#42a5f5" }}
                                      />{" "}
                                      <Typography
                                        variant="body2"
                                        color="inherit"
                                      ></Typography>
                                      <input
                                        id={`imagesInput-${index}`}
                                        type="file"
                                        multiple
                                        ref={ref}
                                        onBlur={onBlur}
                                        name={name}
                                        onChange={(e) =>
                                          onChangeImages(e, index)
                                        }
                                        style={{ display: "none" }}
                                        accept="image/png, image/jpeg, image/wpeg"
                                      />
                                    </Box>
                                  ) : (
                                    <Box
                                      sx={{
                                        position: "relative",
                                        backgroundColor: isDragging
                                          ? "#bbdefb"
                                          : "#e1f5fe",
                                        width: "100%",
                                        minHeight: "150px",
                                        padding: "30px 70px",
                                        borderRadius: "20px",
                                        border: "2px dashed #bbdefb",
                                        boxShadow:
                                          "0px 0px 200px -50px #90caf9",
                                        textAlign: "center",
                                        transition:
                                          "background-color 0.3s ease-in-out",
                                        "&:hover": {
                                          backgroundColor: "#bbdefb",
                                          border: "2px dashed #42a5f5",
                                        },
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        color="inherit"
                                      >
                                        <UploadFile
                                          style={{ color: "#42a5f5" }}
                                        />{" "}
                                        <strong style={{ color: "#42a5f5" }}>
                                          Seleccionar o arrastrar los archivos
                                          aquí
                                        </strong>
                                        <br />
                                        Sube tu imagen en WPEG, JPEG o PNG, con
                                        una resolución mínima de 50 píxeles en
                                        ambos lados y hasta 10 MB de peso.
                                      </Typography>
                                      <input
                                        id={`imagesInput-${index}`}
                                        type="file"
                                        multiple
                                        ref={ref}
                                        onBlur={onBlur}
                                        name={name}
                                        onChange={(e) =>
                                          onChangeImages(e, index)
                                        }
                                        style={{ display: "none" }}
                                        accept="image/png, image/jpeg, image/wpeg"
                                      />
                                    </Box>
                                  )}
                                </Box>
                              );
                            }}
                          />
                        </Grid2>

                        <Grid2
                          size={10}
                          display={"flex"}
                          alignContent={"center"}
                          flexDirection={"row"}
                        >
                          {imagesArray(index)?.map((preview, i) => {
                            return (
                              <Grid2
                                key={i}
                                position="relative"
                                width="150px"
                                height="150px"
                                border="1px solid #ccc"
                                borderRadius="4px"
                                overflow="hidden"
                                marginX={1}
                              >
                                <img
                                  src={preview.filePreview}
                                  alt="Preview"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                {i === 0 ? (
                                  <Chip
                                    label="Principal"
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      color: "#42a5f5",
                                      bgcolor: "#bbdefb",
                                      top: 30,
                                      left: 7,
                                    }}
                                  />
                                ) : (
                                  ""
                                )}

                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  mt={1}
                                >
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
                                      removeImage(preview, index, i);
                                    }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      color: "red",
                                      backgroundColor: "white",
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpen(preview.filePreview);
                                    }}
                                  >
                                    <OpenInFull fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      bottom: 0,
                                      left: 0,
                                      color: "red",
                                      backgroundColor: "white",
                                    }}
                                    onClick={() => moveImage(index, i, -1)}
                                    disabled={i === 0} // Deshabilitar si está en la primera posición
                                  >
                                    <NavigateBefore />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      bottom: 0,
                                      right: 0,
                                      color: "red",
                                      backgroundColor: "white",
                                    }}
                                    onClick={() => moveImage(index, i, 1)}
                                    disabled={
                                      i === imagesArray(index).length - 1
                                    } // Deshabilitar si está en la última posición
                                  >
                                    <NavigateNext />
                                  </IconButton>
                                </Box>

                                <Box
                                  mt={1}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Chip
                                    label={
                                      i === 0
                                        ? "Imagen Principal"
                                        : "Hacer imagen principal"
                                    }
                                    color={i === 0 ? "primary" : "default"}
                                    onClick={() => selectMainImage(index, i)}
                                    clickable
                                  />
                                </Box>
                              </Grid2>
                            );
                          })}
                          <FormControl>
                            <FormHelperText
                              error={!!errors.variants?.[index]?.images}
                            >
                              {errors.variants?.[index]?.images?.message}
                            </FormHelperText>
                          </FormControl>
                        </Grid2>
                      </Grid2>
                    </Grid2>
                    <Grid2 size={12} display={"relative"} gap={2}>
                      {item?.sizes
                        ? item.sizes.map((itemSize, index1) => {
                            const isOpen = collapseOpen.find(
                              (el) => el.id === itemSize.id
                            )?.value;
                            return (
                              <div key={itemSize.id}>
                                <ListItem
                                  sx={{
                                    bgcolor: "info.dark",
                                    borderRadius: "5px",
                                    marginY: 1,
                                  }}
                                  secondaryAction={
                                    <Button
                                      title="Borrar talla"
                                      sx={{
                                        alignContent: "center",
                                        maxWidth: "40px",
                                        color: "red",
                                        "&:hover": {
                                          border: "1px solid",
                                        },
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation(),
                                          MessageDeleteSize(
                                            item.id,
                                            itemSize.id
                                          );
                                      }}
                                    >
                                      <DeleteOutline />
                                    </Button>
                                  }
                                  onClick={() => handleClick(itemSize.id)}
                                >
                                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                                  <ListItemText
                                    sx={{ minWidth: "150px" }}
                                    primary={`Talla`}
                                  />
                                </ListItem>

                                <Collapse in={isOpen} timeout="auto">
                                  <Grid2 container gap={1}>
                                    <Grid2 size={2.9}>
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!errors.variants?.[index]?.sizes?.[
                                            index1
                                          ]?.size
                                        }
                                      >
                                        <InputLabel>Talla o medida*</InputLabel>
                                        <Controller
                                          name={`variants[${index}].sizes[${index1}].size`}
                                          control={control}
                                          rules={{
                                            required: "Campo requerido", // Reglas de validación descomentadas
                                          }}
                                          render={({ field }) => (
                                            <Select
                                              {...field}
                                              size="small"
                                              fullWidth
                                              label="Talla o medida*"
                                            >
                                              {sizeGuide[0]?.dimensions?.map(
                                                (dimension) => (
                                                  <MenuItem
                                                    key={dimension.label}
                                                    value={dimension.label}
                                                  >
                                                    {dimension.label}
                                                  </MenuItem>
                                                )
                                              )}
                                            </Select>
                                          )}
                                        />
                                        <FormHelperText>
                                          {errors.variants?.[index]?.sizes?.[
                                            index1
                                          ]?.size?.message ||
                                            "Seleccione una medida"}
                                        </FormHelperText>
                                      </FormControl>
                                    </Grid2>

                                    <Grid2 size={3}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          required: "Campo requerido",
                                        }}
                                        name={`variants[${index}].sizes[${index1}].tag`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            label="Código*"
                                            size="small"
                                            autoComplete="off"
                                            error={
                                              !!errors.variants?.[index]
                                                ?.sizes?.[index1]?.tag
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes?.[
                                                index1
                                              ]?.tag?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>

                                    <Grid2 size={3}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          required: "Campo requerido",
                                          validate: {
                                            positive: (value) =>
                                              value > 0 ||
                                              "El número debe ser mayor que cero",
                                          },
                                        }}
                                        name={`variants[${index}].sizes[${index1}].stock`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Agregar Stock"
                                            autoComplete="off"
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]
                                                ?.sizes?.[index1]?.stock
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes?.[
                                                index1
                                              ]?.stock?.message ||
                                              "Agregue stock"
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>

                                    <Grid2 size={2.9}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          required: "Campo requerido",
                                          validate: {
                                            positive: (value) =>
                                              value > 0 ||
                                              "El número debe ser mayor que cero",
                                          },
                                        }}
                                        name={`variants[${index}].sizes[${index1}].weight`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Peso(gr)"
                                            autoComplete="off"
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.weight
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.weight?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>
                                    <Grid2 size={3.9}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          required: "Campo requerido",
                                          validate: {
                                            positive: (value) =>
                                              value > 0 ||
                                              "El número debe ser mayor que cero",
                                            lessThanNetPrice: (value) => {
                                              const netPrice = getValues(
                                                `variants[${index}].sizes[${index1}].price`
                                              ); // Obtén el valor del precio neto
                                              return (
                                                value <= netPrice ||
                                                "El precio de compra debe ser menor o igual que el precio neto"
                                              );
                                            },
                                          },
                                        }}
                                        name={`variants[${index}].sizes[${index1}].purchase_price`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Precio de compra (MXN)*"
                                            focused
                                            autoComplete="off"
                                            onChange={(e) => field.onChange(e)}
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.purchase_price
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.purchase_price?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>

                                    <Grid2 size={3.9}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          required: "Campo requerido",
                                          validate: {
                                            positive: (value) =>
                                              value > 0 ||
                                              "El número debe ser mayor que cero",
                                          },
                                        }}
                                        name={`variants[${index}].sizes[${index1}].price`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Precio neto (MXN)*"
                                            focused
                                            autoComplete="off"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                e,
                                                index,
                                                index1
                                              )
                                            }
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.price
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.price?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>

                                    <Grid2 size={3.9}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          min: {
                                            value: 0,
                                            message:
                                              "El descuento no puede ser menor a 0%",
                                          },
                                          max: {
                                            value: 99,
                                            message:
                                              "El descuento no puede ser mayor al 99%",
                                          },
                                        }}
                                        name={`variants[${index}].sizes[${index1}].porcentDiscount`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Descuento (%)"
                                            focused
                                            autoComplete="off"
                                            onChange={(e) =>
                                              handlePriceChange(
                                                e,
                                                index,
                                                index1
                                              )
                                            }
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.porcentDiscount
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.porcentDiscount?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>

                                    <Grid2 size={4}>
                                      <Controller
                                        control={control}
                                        rules={{
                                          validate: (value) =>
                                            value === "" ||
                                            (value >= 0 && value <= 80000) ||
                                            "El precio con descuento debe estar entre $0 y $80000",
                                        }}
                                        name={`variants[${index}].sizes[${index1}].discountPrice`}
                                        render={({ field }) => (
                                          <TextField
                                            {...field}
                                            fullWidth
                                            size="small"
                                            label="Precio con Descuento (MXN)"
                                            autoComplete="off"
                                            focused
                                            type="number"
                                            error={
                                              !!errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.discountPrice
                                            }
                                            helperText={
                                              errors.variants?.[index]?.sizes[
                                                index1
                                              ]?.discountPrice?.message
                                            }
                                          />
                                        )}
                                      />
                                    </Grid2>
                                  </Grid2>
                                </Collapse>
                              </div>
                            );
                          })
                        : ""}
                    </Grid2>
                  </Grid2>

                  <Button
                    onClick={() => handleAddSize(item.id)}
                    variant="contained"
                    color="secondary"
                    sx={{ marginY: 1 }}
                  >
                    Agregar Talla
                  </Button>
                </div>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
            {isLastStep ? "Terminar" : "Continuar"}
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleClose}
          >
            <Close />
          </Fab>
          <img
            src={open.image}
            style={{ maxWidth: "80vh", maxHeight: "80vh" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default VariantsClothesAndShoes;
