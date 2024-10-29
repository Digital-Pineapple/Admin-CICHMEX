import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import {
  Add,
  Delete,
  ExpandLess,
  ExpandMore,
  UploadFile,
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
} from "@mui/material";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import ColorSelector from "../../../components/inputs/ColorSelector";
import { blue } from "@mui/material/colors";

const Variants = ({ handleNext, handleBack, index, isLastStep }) => {
  const [valueVariants, setValueVariants] = useState([]); // Array to hold variants
  const [collapseOpen, setCollapseOpen] = useState([]); // Array to track the open/close state of each variant
  const [productImages, setproductImages] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
    unregister,
  } = useForm({
    defaultValues: {
      variants: [],
    },
  });

  const handleCheckboxChange = (checked, index) => {
    if (checked) {
      setValue(checked, ""); // Reset textInput when checkbox is checked
    }
  };

  // Add a new variant
  const handleAddVariant = () => {
    const newId = valueVariants.length;
    setValueVariants([...valueVariants, { id: newId }]); // Add new variant with id
    setCollapseOpen([...collapseOpen, { id: newId, value: true }]); // Set collapse as closed for new variant

    // Initialize form values for the new variant
    setValue(`variants[${newId}]`, {
      sku: "",
      weight: "",
      design: { textInput: "", checkbox: false },
      tag: { textInput: "", checkbox: false },
      color: "",
      images: [],
    });
  };

  // Remove variant and its form values
  const MessageDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro de eliminar esta variante?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
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
          <Chip variant="filled" size="small" label="Variante principal"></Chip>
        </ListItem>
      );
    }
  };
  const fieldValues = watch("variants");
  
  
  

  const onSubmit = (values) => {
    console.log(values, "subir info");
  };

  return (
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
          {valueVariants.map((item, index) => {
            const isOpen = collapseOpen.find((el) => el.id === item.id)?.value;

            return (
              <div key={item.id}>
                <ListItem
                  secondaryAction={
                    <Button
                      sx={{ alignContent: "center", maxWidth: "40px" }}
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

                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                      <ColorSelector />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`variants[${index}].tag.textInput`}
                        rules={{
                          required: {
                            value: !watch(`variants[${item.id}].tag.checkbox`),
                            message: "Campo requerido",
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            disabled={watch(`variants[${index}].tag.checkbox`)}
                            label="Codigo universal de producto"
                            error={!!errors.variants?.[index]?.tag?.textInput}
                            helperText={
                              errors.variants?.[index]?.tag?.textInput?.message
                            }
                          />
                        )}
                      />

                      <Controller
                        name={`variants[${index}].tag.checkbox`}
                        control={control}
                        render={({ field: { onChange, name } }) => (
                          <FormControlLabel
                            componentsProps={{
                              typography: { variant: "body2" },
                            }}
                            control={
                              <Checkbox
                                checked={watch(
                                  `variants[${index}].tag.checkbox`
                                )}
                                size="small"
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                  handleCheckboxChange(
                                    `variants[${index}].tag.textInput`,
                                    e.target.checked,
                                    index
                                  );
                                }}
                              />
                            }
                            label="Mi producto no lo tiene*"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        rules={{
                          required: {
                            value: !watch(`variants[${index}].sku`),
                            message: "Campo requerido",
                          },
                        }}
                        name={`variants[${index}].sku`}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="SKU"
                            autoComplete="off"
                            error={!!errors.variants?.[index]?.sku}
                            helperText={errors.variants?.[index]?.sku.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel>Fotos (requerido)</FormLabel>
                        <Controller
                          control={control}
                          rules={{
                            required: {
                              value: !watch(`variants[${index}].images`),
                              message: "Campo requerido",
                            },
                          }}
                          name={`variants[${index}].images`}
                          render={({
                            field: { name, ref, onChange, onBlur },
                          }) => (
                            <Box
                              width="fit-content"
                              height="fit-content"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              component="label"
                              htmlFor="imagesInput"
                              sx={{ cursor: "pointer" }}
                            >
                              <Box
                                sx={{
                                  position: "relative",
                                  backgroundColor: "#e1f5fe",
                                  padding: "30px 70px",
                                  borderRadius: "20px",
                                  border: "2px dashed #bbdefb",
                                  boxShadow: "0px 0px 200px -50px #90caf9",
                                  textAlign: "center",
                                  transition:
                                    "background-color 0.3s ease-in-out",
                                  "&:hover": {
                                    backgroundColor: "#bbdefb",
                                    border: "2px dashed #42a5f5",
                                  },
                                  
                                }}
                              >
                                <Typography variant="body2" color="inherit">
                                  <UploadFile style={{ color: "#42a5f5" }} />{" "}
                                  <strong style={{ color: "#42a5f5" }}>
                                    Seleccionar o arrastrar los archivos aquí
                                  </strong>
                                  <br />
                                  Sube tu imagen en JPG, JPEG o PNG , con
                                  una resolución mínima de 50 píxeles en ambos
                                  lados y hasta 10 MB de peso.
                                </Typography>
                                <input
                                  id="imagesInput"
                                  type="file"
                                  multiple
                                  ref={ref}
                                  onBlur={onBlur}
                                  name={name}
                                  onChange={(e) => onChange({...watch(`variants[${index}].images)`, e.target.value)})}
                                  style={{ display: "none" }}
                                  accept="image/png, image/jpeg,"
                                />
                              </Box>
                            </Box>
                          )}
                        />
                        <FormHelperText error={!!errors.variants?.[index]?.images}>
                          {!!errors.variants?.[index]?.images.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    {/* Example of new fields for each variant */}
                    <Controller
                      control={control}
                      name={`variants[${index}].weight`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Peso"
                          type="number"
                          autoComplete="off"
                        />
                      )}
                    />
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
          {isLastStep ? "Guardar" : "Continuar"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Variants;
