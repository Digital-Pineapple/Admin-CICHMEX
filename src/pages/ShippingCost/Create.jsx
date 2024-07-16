import {
    Grid,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
  import { Controller, useForm } from "react-hook-form";
  import { useAuthStore, useShippingCost } from "../../hooks";
  import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
  
  const Create = () => {
    const { control, handleSubmit} = useForm({
      defaultValues: {
        starting_weight: "",
        end_weight: "",
        price_weight: "",
      },
    });
    const { createShippingCost } = useShippingCost();
    
  
    const createOneShippingCost = (values) => {
      createShippingCost(values);
    };
  
    // if (logged) {
    //   return <LoadingScreenBlue />;
    // }
  
    return (
      <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
        <Grid
          item
          marginTop={{ xs: "-30px" }}
          xs={12}
          minHeight={"100px"}
          className="Titles"
        >
          <Typography
            textAlign={"center"}
            variant="h1"
            fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
          >
            Crear costo de envío
          </Typography>
        </Grid>
        <Grid
          onSubmit={handleSubmit(createOneShippingCost)}
          component={"form"}
          container
          padding={2}
          gap={2}
        >
          <Grid item xs={12} sm={6}>
            <Controller
              name="starting_weight"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "Valor requerido" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  variant="filled"
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
          </Grid>
  
          <Grid item xs={12} sm={5.7} >
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
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Controller
              name="price_weight"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "Valor requerido" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  variant="filled"
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
          </Grid>

  <Grid item xs={4}>
    <Button variant="contained" fullWidth type="submit" color="primary">
            Crear 
          </Button>
  </Grid>
          
        </Grid>
      </Grid>
    );
  };
  
  
  export default Create