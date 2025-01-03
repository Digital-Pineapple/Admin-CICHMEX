import { Grid, TextField, Button, Typography, Grid2 } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore, useShippingCost } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

const Create = ({handleCloseModal}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      starting_weight: "",
      end_weight: "",
      price_weight: "",
    },
  });
  const { createShippingCost } = useShippingCost();

  const createOneShippingCost = (values) => {
    createShippingCost(values, handleCloseModal);
  };

  return (
    <Grid2  container>
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

      <Grid2
        onSubmit={handleSubmit(createOneShippingCost)}
        component={"form"}
        container
        gap={2}
      >
        <Grid2 size={12} gap={2} flexDirection={'column'} display={'flex'}>
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

        <Grid2 width={"100%"} >
          <Button variant="contained" fullWidth type="submit" color="success">
            Crear
          </Button>
          <Button sx={{marginTop:1}} variant="contained" fullWidth onClick={()=> handleCloseModal()} color="warning">
            Cancelar
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Create;
