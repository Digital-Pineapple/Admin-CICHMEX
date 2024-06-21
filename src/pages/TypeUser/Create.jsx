import { Grid, TextField, Button } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTypeUser } from "../../hooks/useTypeUser";

const Create = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });
  const {createTypeUser} = useTypeUser()
  const createTU = (values) => {
    createTypeUser(values);
  };

  return (
    <Grid container display={'flex'} flexDirection={'column'} spacing={2} padding={2} justifyContent={'center'} marginX={"10%"}>
      <h1>Crear tipo de usuario</h1>
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
