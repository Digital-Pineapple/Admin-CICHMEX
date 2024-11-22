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
  ExpandLess,
  ExpandMore,
  OpenInFull,
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
  Grid,
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

const Variants = ({ handleNext, handleBack, index, isLastStep, videoFile }) => {
  const {dataStep4, dataProduct} = useProducts()
  const [valueVariants, setValueVariants] = useState([]); // Array to hold variants
  const [collapseOpen, setCollapseOpen] = useState([]); // Array to track the open/close state of each variant
  const [open, setOpen] = useState({ image: null, value: false });
  const { sizeGuide } = useSizeGuide();
  const handleOpen = (image) => {
    setOpen({ image: image, value: true });
  };
  const handleClose = () => setOpen({ image: null, value: false });
  const DefaultValues = (data) => ({
    variants: data?.variants || [], // Maneja el caso en que `data.variants` sea `undefined`
  });
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    unregister,
  } = useForm({ defaultValues: DefaultValues(dataProduct)});
  useEffect(() => {
    const info = DefaultValues(dataProduct);
    setValueVariants(info.variants);
    reset(info); // Resetea el formulario con los valores iniciales
  }, [dataProduct, reset]);
  
  
  

  const handleCheckboxChange = (checked, index) => {
    setValue(`variants[${index}].design.checkbox`, checked);
  
    if (checked) {
      setValue(`variants[${index}].design.textInput`, ""); // Limpia el campo relacionado
    }
  };
  

  // Add a new variant
  const handleAddVariant = () => {
    const newId = valueVariants.length;
    setValueVariants([...valueVariants, { id: newId }]); // Add new variant with id
    setCollapseOpen([...collapseOpen, { id: newId, value: true }]); // Set collapse as closed for new variant

    // Initialize form values for the new variant
    setValue(`variants[${newId}]`, {
      weight: "",
      design: { textInput: "", checkbox: false },
      color: "",
      images: [],
      size: "",
      price: "",
      porcentDiscount: "",
      discountPrice: "",
      stock :null
    });
  };

  // Remove variant and its form values
  const MessageDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro de eliminar esta variante?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const ChangeDelete = valueVariants.filter((item) => item.id !== id);
        setValueVariants(ChangeDelete);

        // Remove variant form values
        unregister(`variants[${id}]`);

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
    // Obtener el primer archivo seleccionado
    const file = event.target.files[0];

    if (!file) return; // Sale si no hay un archivo seleccionado

    // Obtener el array de imágenes actual del formulario
    const currentImages = watch(`variants[${indexVariant}].images`) || [];

    // Verificar si ya alcanzó el límite de 6 imágenes
    if (currentImages.length >= 6) {
      return; // No hace nada si ya tiene 6 imágenes
    }

    // Crear la URL de vista previa para la nueva imagen
    const filePreview = URL.createObjectURL(file);

    // Actualizar el estado de imágenes del formulario en el índice especificado
    setValue(`variants[${indexVariant}].images`, [
      ...currentImages,
      { file, filePreview },
    ]);
  };

  
  const removeImage = (preview, index, i) => {
    const variantImages = watch(`variants.[${index}].images`);
    let updateImages = variantImages.filter((item, index) => index !== i);
    setValue(`variants.[${index}].images`, updateImages);
  };
  
  const imagesArray = (indexVariant) =>
    watch(`variants[${indexVariant}].images`) || [];


  const onSubmit = ({variants}) => {
    dataStep4(variants)
    handleNext()
  };

  const calculateDiscountPrice = (price, porcentDiscount) => {
    if (!price || !porcentDiscount) return "";
    return price - (price * porcentDiscount) / 100;
  };
  
  const handlePriceChange = (e, indexVariant) => {
    const { name, value } = e.target;
    const fieldValue = parseFloat(value) || "";
  
    let price = watch(`variants[${indexVariant}].price`);
    let discount = watch(`variants[${indexVariant}].porcentDiscount`);
  
    if (name.includes("price")) price = fieldValue;
    if (name.includes("porcentDiscount")) discount = fieldValue;
  
    const discountPrice = calculateDiscountPrice(price, discount);
  
    setValue(`variants[${indexVariant}].price`, price);
    setValue(`variants[${indexVariant}].porcentDiscount`, discount);
    setValue(`variants[${indexVariant}].discountPrice`, discountPrice);
  };
  
  

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
              const isOpen = collapseOpen.find(
                (el) => el.id === item.id
              )?.value;

              return (
                <div key={item.id}>
                  <ListItem
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
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      sx={{ minWidth: "150px" }}
                      primary={`Variante ${item.id + 1}`}
                    />
                    {isMain(item.id)}
                  </ListItem>

                  <Collapse in={isOpen} timeout="auto" >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <FormControl
                          fullWidth
                          error={!!errors.variants?.[index]?.size}
                        >
                          <InputLabel>Talla o medida*</InputLabel>
                          <Controller
                            name={`variants[${index}].size`}
                            control={control}
                            rules={{
                              required: {
                                value: true,
                                message: "Campo requerido",
                              },
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                size="small"
                                label="Talla o medida*"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  setValue(
                                    `variants[${index}].size`,
                                    e.target.value
                                  ); // Ajusta el valor seleccionado
                                }}
                              >
                                {sizeGuide[0]?.dimensions?.map((i) => (
                                  <MenuItem key={i.label} value={i.label}>
                                    {i.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                          <FormHelperText>
                            {errors.variants?.[index]?.size
                              ? errors.variants?.[index]?.size.message
                              : "Seleccione una medida"}
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
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
                              label="Color"
                              error={!!errors.variants?.[index]?.color}
                              helperText={
                                errors.variants?.[index]?.color?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            required: {
                              value: !watch(`variants[${index}].tag`),
                              message: "Campo requerido",
                            },
                          }}
                          name={`variants[${index}].tag`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Código"
                              size="small"
                              autoComplete="off"
                              error={!!errors.variants?.[index]?.tag}
                              helperText={
                                errors.variants?.[index]?.tag?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          name={`variants[${index}].design.textInput`}
                          rules={{
                            required: {
                              value: !watch(
                                `variants[${item.id}].design.checkbox`
                              ),
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
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            required: {
                              value: !watch(`variants[${index}].stock`),
                              message: "Campo requerido",
                            },
                          }}
                          name={`variants[${index}].stock`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label="Agregar Stock"
                              autoComplete="off"
                              type="number"
                              error={!!errors.variants?.[index]?.stock}
                              helperText={
                                errors.variants?.[index]?.stock?.message
                              }
                            />
                          )}
                        />
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            required: {
                              value: !watch(`variants[${index}].weight`),
                              message: "Campo requerido",
                            },
                            min: {
                              value: 1,
                              message: "Valor no menor de 1gr",
                            },
                            max: {
                              value: 80000,
                              message: "Valor no mayor de de 80000gr",
                            },
                          }}
                          name={`variants[${index}].weight`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label="Peso(gr)"
                              autoComplete="off"
                              type="number"
                              error={!!errors.variants?.[index]?.weight}
                              helperText={
                                errors.variants?.[index]?.weight?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            required: {
                              value: !watch(`variants[${index}].price`),
                              message: "Campo requerido",
                            },
                            min: {
                              value: 0,
                              message: "Valor no menor de $1",
                            },
                            max: {
                              value: 80000,
                              message: "Valor no mayor de de $1000000",
                            },
                          }}
                          name={`variants[${index}].price`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label="Precio(MXN)*"
                              autoComplete="off"
                              name={`variants[${index}].price`} // Añade el name dinámico
                              onChange={(e) => handlePriceChange(e, index)}
                              type="number"
                              error={!!errors.variants?.[index]?.price}
                              helperText={
                                errors.variants?.[index]?.price?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            min: {
                              value: 0, // Aceptar desde 0
                              message: "El descuento no puede ser menor a 0",
                            },
                            max: {
                              value: 99,
                              message: "El descuento no puede ser mayor de 99",
                            },
                          }}
                          
                          name={`variants[${index}].porcentDiscount`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label="Descuento"
                              autoComplete="off"
                              name={`variants[${index}].porcentDiscount`}
                              onChange={(e) => handlePriceChange(e, index)}
                              type="number"
                              error={
                                !!errors.variants?.[index]?.porcentDiscount
                              }
                              helperText={
                                errors.variants?.[index]?.porcentDiscount
                                  ?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <Controller
                          control={control}
                          rules={{
                            min: {
                              value: 1,
                              message: "Valor no menor de $1",
                            },
                            max: {
                              value: 80000,
                              message: "Valor no mayor de de $1000000",
                            },
                            validate: (value) => value === "" || (value >= 1 && value <= 80000) || "Valor inválido",
                          }}
                          name={`variants[${index}].discountPrice`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label="Precio con descuento(MXN)"
                              autoComplete="off"
                              name={`variants[${index}].discountPrice`} // Añade el name dinámico
                              onChange={(e) => handlePriceChange(e, index)}
                              type="number"
                              error={!!errors.variants?.[index]?.discountPrice}
                              helperText={
                                errors.variants?.[index]?.discountPrice?.message
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid
                        item
                        display={"flex"}
                        xs={12}
                      >
                        <Grid
                          container
                          padding={1}
                          spacing={2}
                          display={"flex"}
                          justifyContent={"center"}
                          width={ "100%"}
                        >
                          <Grid
                            item
                            xs={imagesArray(index).length > 0 ? 1 : 12}
                          >
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
                                          Sube tu imagen en WPEG, JPEG o PNG,
                                          con una resolución mínima de 50
                                          píxeles en ambos lados y hasta 10 MB
                                          de peso.
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
                          </Grid>

                          <Grid
                            item
                            xs={10}
                            display={"flex"}
                            alignContent={"center"}
                            flexDirection={"row"}
                          >
                            {imagesArray(index).map((preview, i) => {
                              return (
                                <Grid
                                  key={i}
                                  position="relative"
                                  width="80px"
                                  height="80px"
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
                                </Grid>
                              );
                            })}
                            <FormControl>
                              <FormHelperText
                                error={!!errors.variants?.[index]?.images}
                              >
                                {errors.variants?.[index]?.images?.message}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                        
                      </Grid>
                    </Grid>
                  </Collapse>
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

export default Variants;
