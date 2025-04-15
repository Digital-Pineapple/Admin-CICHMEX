import { Grid, TextField, Button, Typography, Grid2 } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore, useShippingCost } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const Create = ({handleCloseModal}) => {
  // Configuración del formulario con valores predeterminados
  const { control, handleSubmit } = useForm({
    defaultValues: {
      starting_weight: "",
      end_weight: "",
      price_weight: "",
    },
  });

  // Hook personalizado para manejar la creación de costos de envío
  const { createShippingCost } = useShippingCost();

  // Función para manejar la creación de un costo de envío
  const createOneShippingCost = (values) => {
    createShippingCost(values, handleCloseModal);
  };

  return (
    <Grid2 container>
      {/* Título del formulario */}
      <Grid2
        size={12}
        minHeight={"70px"}
        className="Titles"
        marginBottom={1}
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Crear costo de envío
        </Typography>
      </Grid2>

      {/* Formulario para crear el costo de envío */}
      <Grid2
        onSubmit={handleSubmit(createOneShippingCost)} // Manejo del envío del formulario
        component={"form"}
        container
        gap={2}
      >
        {/* Campos del formulario */}
        <Grid2 size={12} gap={2} flexDirection={'column'} display={'flex'}>
          {/* Campo para el peso inicial */}
          <Controller
            name="starting_weight"
            control={control}
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                label="Peso inicial (gr)"
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
                label="Peso final (gr)"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
       
          {/* Campo para el precio del envío */}
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

        {/* Botones de acción */}
        <Grid2 width={"100%"} >
          {/* Botón para crear el costo de envío */}
          <Button variant="contained" fullWidth type="submit" color="success">
            Crear
          </Button>
          {/* Botón para cancelar y cerrar el modal */}
          <Button sx={{marginTop:1}} variant="contained" fullWidth onClick={()=> handleCloseModal()} color="warning">
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Create;
