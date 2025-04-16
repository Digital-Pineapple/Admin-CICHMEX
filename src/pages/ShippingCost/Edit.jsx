import {
  Grid2,
  TextField,
  Button,
  Typography,
  } from "@mui/material";
  import { Controller, useForm } from "react-hook-form";
  import { useShippingCost } from "../../hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
  
  const Edit = ({handleCloseModal, SC}) => {
  // Obtenemos el costo de envío actual
  const shippingCost = SC;
  const { updateShippingCost } = useShippingCost();

  // Configuración del formulario con valores predeterminados
  const { control, handleSubmit } = useForm({
    defaultValues: {
    starting_weight: shippingCost?.starting_weight || "",
    end_weight:  shippingCost?.end_weight || "",
    price_weight: shippingCost?.price_weight || "",
    },
  });

  // Función para actualizar un costo de envío
  const updateOneShippingCost = (values) => {
    updateShippingCost(shippingCost._id, values, handleCloseModal);
  };
  
  return (
    <Grid2 container>
    {/* Título de la página */}
    <Grid2
      size={12}
      minHeight={"100px"}
      className="Titles"
      marginBottom={1}
    >
      <Typography
      textAlign={"center"}
      variant="h1"
      fontSize={{ xs: "20px", sm: "30px" }}
      >
      Editar costo de envío
      </Typography>
    </Grid2>

    {/* Formulario para editar el costo de envío */}
    <Grid2
      onSubmit={handleSubmit(updateOneShippingCost)}
      component={"form"}
      container
      gap={2}
    >
      <Grid2 size={12} gap={2} flexDirection={'column'} display={'flex'} >
      {/* Campo para el peso inicial */}
      <Controller
        name="starting_weight"
        control={control}
        defaultValue=""
        rules={{
        required: { value: true, message: "Valor requerido" },
        }}
        render={({ field, fieldState }) => (
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Peso inicial"
          helperText={
          fieldState.error ? <b>{fieldState.error.message}</b> : ""
          }
          error={fieldState.invalid}
          inputProps={{ ...field }}
        />
        )}
      />
     
      {/* Campo para el peso final */}
      <Controller
        name="end_weight"
        control={control}
        defaultValue=""
        rules={{
        required: { value: true, message: "Valor requerido" },
        }}
        render={({ field, fieldState }) => (
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Peso final"
          helperText={
          fieldState.error ? <b>{fieldState.error.message}</b> : ""
          }
          error={fieldState.invalid}
          inputProps={{ ...field }}
        />
        )}
      />

      {/* Campo para el precio de envío */}
      <Controller
        name="price_weight"
        control={control}
        defaultValue=""
        rules={{
        required: { value: true, message: "Valor requerido" },
        }}
        render={({ field, fieldState }) => (
        <TextField
          variant="outlined"
          label="Precio de envio"
          fullWidth
          helperText={
          fieldState.error ? <b>{fieldState.error.message}</b> : ""
          }
          error={fieldState.invalid}
          inputProps={{ ...field }}
        />
        )}
      />
      </Grid2>

      {/* Botones para enviar o cancelar */}
      <Grid2 size={12}>
      <Button variant="contained" fullWidth type="submit" color="success">
        Editar
      </Button>
      <Button
        sx={{ marginTop: 1 }}
        variant="contained"
        fullWidth
        onClick={() => handleCloseModal()}
        color="warning"
      >
        Cancelar
      </Button>
      </Grid2>
    </Grid2>
    </Grid2>
  );
  };
  
  export default Edit;