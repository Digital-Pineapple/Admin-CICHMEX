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
const shippingCost = SC
const {  updateShippingCost } = useShippingCost();

    const { control, handleSubmit} = useForm({
      defaultValues: {
        starting_weight: shippingCost?.starting_weight || "",
        end_weight:  shippingCost?.end_weight || "",
        price_weight: shippingCost?.price_weight|| "",
      },
    });

  
    const updateOneShippingCost = (values) => {
      updateShippingCost(shippingCost._id,values, handleCloseModal);
    };
  
    return (
      <Grid2 container>
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
        <Grid2
          onSubmit={handleSubmit(updateOneShippingCost)}
          component={"form"}
          container
        
          gap={2}
        >
          <Grid2 size={12} gap={2} flexDirection={'column'} display={'flex'} >
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

  <Grid2 size={12} >
    <Button variant="contained" fullWidth type="submit" color="success">
            Editar
          </Button>
          <Button sx={{marginTop:1}} variant="contained" fullWidth onClick={()=>handleCloseModal()} color="warning">
            Cancelar
          </Button>
  </Grid2>
          
        </Grid2>
      </Grid2>
    );
  };
  
  
  export default Edit