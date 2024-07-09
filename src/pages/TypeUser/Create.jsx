import { Grid, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTypeUser } from "../../hooks/useTypeUser";

const Create = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });
  const {createTypeUser} = useTypeUser()
  const createTU = (values) => {
    addCarrier(values);
  };

  return (
    <Grid container display={'flex'} flexDirection={'column'} spacing={2} padding={2} justifyContent={'center'} marginX={"10%"}>
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
          Crear tipo de usuario
        </Typography>
      </Grid>
      <Grid
        onSubmit={handleSubmit(createTU)}
        component={"form"}
        item
        display={'flex'}
        flexDirection={'column'}
        maxWidth={{xs:'250px', md:'500px'}}

      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" },
            pattern: { value: /^[a-zA-Z]{2,20}$/, message: "Campo inválido" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Nombre tipo de usuario"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : ""
              }
              error={fieldState.invalid}
              inputProps={{ ...field }}
            />
          )}
        />
        <br />
        <Button variant="contained" type="submit" color="primary">
          Crear
        </Button>
      </Grid>
    </Grid>
  );
};

export default Create;
