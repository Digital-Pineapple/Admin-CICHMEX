import { CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

// Componente InputControl que utiliza react-hook-form y Material-UI
const InputControl = ({
  name, // Nombre del campo, utilizado para identificarlo en el formulario
  control, // Control proporcionado por react-hook-form para manejar el estado del formulario
  rules = {}, // Reglas de validación para el campo
  label, // Etiqueta que se mostrará en el TextField
  errors, // Objeto de errores proporcionado por react-hook-form
  multiline = false, // Define si el campo debe ser de múltiples líneas
  rows = 1, // Número de filas para el campo de texto si es multiline
  disabled = false, // Define si el campo está deshabilitado
  loading = false, // Muestra un indicador de carga si es true
  onChange = () => null, // Función que se ejecuta al cambiar el valor del campo
  fullWidth = true, // Define si el campo debe ocupar todo el ancho disponible
  placeholder = "", // Texto de marcador de posición para el campo
  type = "text", // Tipo de entrada (texto, contraseña, etc.)
  startAdornment // Elemento que se muestra al inicio del campo de texto
}) => {
  return (
    <Controller
      name={name} // Vincula el nombre del campo con el controlador de react-hook-form
      control={control} // Control del formulario
      rules={rules} // Reglas de validación
      render={({ field }) => (
        <TextField
          label={label} // Etiqueta del campo
          type={type} // Tipo de entrada
          fullWidth={fullWidth} // Define si ocupa todo el ancho
          variant="outlined" // Estilo del campo (outlined)
          inputRef={field.ref} // Referencia del campo para react-hook-form
          value={field.value || ""} // Valor del campo (manejado por react-hook-form)
          onChange={(e) => {
            field.onChange(e.target.value); // Actualiza el valor en react-hook-form
            onChange(e); // Ejecuta la función personalizada onChange
          }}
          error={!!errors[name]} // Muestra error si existe en el objeto de errores
          helperText={errors[name] && errors[name].message} // Mensaje de error si existe
          autoComplete="off" // Desactiva el autocompletado
          multiline={multiline} // Define si es de múltiples líneas
          placeholder={placeholder} // Texto de marcador de posición
          rows={rows} // Número de filas si es multiline
          disabled={disabled} // Define si el campo está deshabilitado
          InputProps={{
            endAdornment: loading && (
              <CircularProgress color="inherit" size={20} /> // Indicador de carga
            ),
            startAdornment: startAdornment // Elemento al inicio del campo
          }}
        />
      )}
    />
  );
};

export default InputControl;
