import { Grid2, TextField, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../../../hooks";
import ColorSelector from "../../../components/inputs/ColorSelector";

const UpdateVariantColor = ({ values = [], color, handleClose }) => {
  // Encuentra el objeto de variante que coincide con el color proporcionado
  const dataVariant = values.find(i => i.color === color);

  // Define los valores predeterminados del formulario
  const DefaultValues = (data) => ({
    color: data?.color || "",
    design: { textInput: data?.design, checkbox: false } || {
      textInput: "",
      checkbox: true,
    },
  });

  // Configuración del formulario utilizando react-hook-form
  const {
    control, // Controlador para los campos del formulario
    formState: { errors }, // Errores de validación
    handleSubmit, // Función para manejar el envío del formulario
    watch, // Observa los cambios en los valores del formulario
    setValue, // Permite establecer valores en el formulario
  } = useForm({
    defaultValues: DefaultValues(dataVariant), // Inicializa con los valores predeterminados
  });

  // Maneja el cambio del estado del checkbox
  const handleCheckboxChange = (checked) => {
    setValue(`design.checkbox`, checked); // Actualiza el valor del checkbox

    if (checked) {
      setValue(`design.textInput`, ""); // Limpia el campo de texto relacionado si el checkbox está marcado
    }
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (e) => {
    console.log(e, "valores"); // Imprime los valores del formulario en la consola
  };

  return (
    <Grid2
      component={"form"}
      display={"flex"}
      gap={2}
      onSubmit={handleSubmit(onSubmit)} // Maneja el envío del formulario
      container
    >
      {/* Título del formulario */}
      <Grid2 size={12} minHeight={"100px"} className="Titles">
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px" }}
        >
          Editar color o diseño
        </Typography>
      </Grid2>

      {/* Selector de color */}
      <Grid2 size={12}>
        <Controller
          control={control}
          name={`color`}
          rules={{
            required: {
              value: !watch(`color`), // Valida que el campo no esté vacío
              message: "Campo requerido", // Mensaje de error
            },
          }}
          render={({ field }) => (
            <ColorSelector
              {...field}
              fullWidth
              value={watch(`color`)} // Observa el valor del campo
              label="Color"
              error={!!errors.color} // Muestra error si existe
              helperText={errors.color?.message} // Mensaje de error
            />
          )}
        />
      </Grid2>

      {/* Campo de texto para diseño y checkbox */}
      <Grid2 size={12}>
        {/* Campo de texto para diseño */}
        <Controller
          control={control}
          name={`design.textInput`}
          rules={{
            required: {
              value: !watch(`design.checkbox`), // Valida que el campo no esté vacío si el checkbox no está marcado
              message: "Campo requerido", // Mensaje de error
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              disabled={watch(`design.checkbox`)} // Desactiva el campo si el checkbox está marcado
              label="Diseño"
              error={!!errors.design?.textInput} // Muestra error si existe
              helperText={errors.design?.textInput?.message} // Mensaje de error
            />
          )}
        />

        {/* Checkbox para "No aplica" */}
        <Controller
          name={`design.checkbox`}
          control={control}
          render={({ field: { onChange, name } }) => (
            <FormControlLabel
              componentsProps={{
                typography: { variant: "body2" },
              }}
              control={
                <Checkbox
                  sx={{ marginLeft: "10px" }}
                  checked={watch(`design.checkbox`)} // Observa el estado del checkbox
                  size="small"
                  onChange={(e) => {
                    onChange(e.target.checked); // Actualiza el estado del checkbox
                    handleCheckboxChange(e.target.checked); // Maneja el cambio del checkbox
                  }}
                />
              }
              label="No aplica *"
            />
          )}
        />
      </Grid2>

      {/* Botones de acción */}
      <Grid2 display={"flex"} gap={2} size={12}>
        {/* Botón para cancelar */}
        <Button
          fullWidth
          onClick={() => handleClose()} // Cierra el formulario
          variant="contained"
          color="warning"
        >
          Cancelar
        </Button>

        {/* Botón para guardar cambios */}
        <Button fullWidth type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default UpdateVariantColor;
