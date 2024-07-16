import {
    Grid,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
  import { Controller, useForm } from "react-hook-form";
  import { useShippingCost } from "../../hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
  
  const Edit = () => {
const { id } = useParams()
const { loadOneShippingCost, shippingCost, updateShippingCost } = useShippingCost();

    const { control, handleSubmit} = useForm({
      defaultValues: {
        starting_weight: shippingCost?.starting_weight || "",
        end_weight:  shippingCost.end_weight || "",
        price_weight: shippingCost.price_weight|| "",
      },
    });

    useEffect(() => {
    loadOneShippingCost(id)
    }, [id])
    
    
    
    // const {  logged } = useAuthStore();
  
    const updateOneShippingCost = (values) => {
      updateShippingCost(id,values);
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
            Editar costo de envío
          </Typography>
        </Grid>
        <Grid
          onSubmit={handleSubmit(updateOneShippingCost)}
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
            Editar
          </Button>
  </Grid>
          
        </Grid>
      </Grid>
    );
  };
  
  
  export default Edit