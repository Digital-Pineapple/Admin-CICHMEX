import { Grid, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTypeUser } from "../../hooks/useTypeUser";

const Create = () => {
  // Inicializa el formulario con react-hook-form y define valores por defecto
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });
  
  // Hook personalizado para manejar la creación de tipos de usuario
  const { createTypeUser } = useTypeUser();

  // Función que se ejecuta al enviar el formulario
  const createTU = (values) => {
    createTypeUser(values); // Llama a la función para crear un tipo de usuario
  };

  return (
    <Grid container display={'flex'}>
      {/* Título de la página */}
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

      {/* Formulario para crear un tipo de usuario */}
      <Grid
        onSubmit={handleSubmit(createTU)} // Maneja el envío del formulario
        component={"form"}
        item
        xs={12}
        mt={5}
        display={'flex'}
        flexDirection={'column'}
      >
        {/* Campo de texto controlado para ingresar el nombre del tipo de usuario */}
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Valor requerido" }, // Validación: campo obligatorio
            pattern: { value: /^[a-zA-Z]{2,20}$/, message: "Campo inválido" }, // Validación: solo letras, entre 2 y 20 caracteres
          }}
          render={({ field, fieldState }) => (
            <TextField
              variant="outlined"
              label="Nombre tipo de usuario"
              helperText={
                fieldState.error ? <b>{fieldState.error.message}</b> : "" // Muestra mensaje de error si existe
              }
              error={fieldState.invalid} // Marca el campo como inválido si hay error
              inputProps={{ ...field }} // Propiedades del campo
            />
          )}
        />
        <br />
        {/* Botón para enviar el formulario */}
        <Button variant="contained" type="submit" color="primary">
          Crear
        </Button>
      </Grid>
    </Grid>
  );
};

export default Create;
