import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
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
} from "@mui/material";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import ColorSelector from "../../../components/inputs/ColorSelector";

const Variants = ({ handleNext, handleBack, index, isLastStep }) => {
  const [valueVariants, setValueVariants] = useState([]); // Array to hold variants
  const [collapseOpen, setCollapseOpen] = useState([]); // Array to track the open/close state of each variant

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
    setCollapseOpen([...collapseOpen, { id: newId, value: false }]); // Set collapse as closed for new variant

    // Initialize form values for the new variant
    setValue(`variants[${newId}]`, {
      sku: "",
      weight: "",
      design: { textInput: "", checkbox: false },
      tag:{textInput: "", checkbox: false},
      color: "",

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

  const onSubmit = (values) =>{
    console.log(values,'subir info');
    
  }

  return (
    <Card variant="elevation" component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <CardHeader
        title="Variantes y fotos"
        subheader="Suma color, fotos, tallas de la guía seleccionada, cantidad y otros datos específicos para cada variante del producto."
      />
      <CardContent>
        <Button variant="contained" color="secondary" onClick={handleAddVariant}>
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
                      rules={{ required: { value:!watch(`variants[${item.id}].design.checkbox`), message: "Campo requerido" } }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={watch(`variants[${index}].design.checkbox`)}
                          label="Diseño"
                          error={!!errors.variants?.[index]?.design?.textInput}
                          helperText={errors.variants?.[index]?.design?.textInput?.message}
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
                              checked={watch(`variants[${index}].design.checkbox`)}
                              size="small"
                              onChange={(e) => {
                                onChange(e.target.checked);
                                handleCheckboxChange(`variants[${index}].design.textInput`, e.target.checked, index);
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
                      rules={{ required: { value:!watch(`variants[${item.id}].tag.checkbox`), message: "Campo requerido" } }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={watch(`variants[${index}].tag.checkbox`)}
                          label="Codigo universal de producto"
                          error={!!errors.variants?.[index]?.tag?.textInput}
                          helperText={errors.variants?.[index]?.tag?.textInput?.message}
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
                              checked={watch(`variants[${index}].tag.checkbox`)}
                              size="small"
                              onChange={(e) => {
                                onChange(e.target.checked);
                                handleCheckboxChange(`variants[${index}].tag.textInput`, e.target.checked, index);
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
                      rules={{ required: { value:!watch(`variants[${index}].sku`), message: "Campo requerido" } }}
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
        <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
