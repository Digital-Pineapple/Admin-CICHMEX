import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import { useServices } from "../../hooks/useServices";

// Componente para la barra de búsqueda de servicios
export const ImputSearchServices = (value) => {
  // Hook personalizado para realizar búsquedas de servicios
  const { searchService } = useServices();

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      value: value, // Valor inicial del campo de búsqueda
    },
    onSubmit: (value) => {
      try {
        // Llama a la función de búsqueda con el valor ingresado
        searchService(value);
      } catch (error) {
        // Manejo de errores en caso de que falle la búsqueda
        console.log(error);
      }
    },
  });

  return (
    // Contenedor principal del formulario con estilo de Material-UI
    <Paper
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      {/* Campo de entrada para el texto de búsqueda */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id="value"
        name="value"
        value={formik.values.name} // Valor del campo controlado por Formik
        onChange={formik.handleChange} // Actualiza el valor en Formik
        placeholder="Buscar servicio" // Texto de ayuda en el campo
        inputProps={{ "aria-label": "Buscar servicio" }} // Accesibilidad
      />
      {/* Botón para realizar la búsqueda */}
      <IconButton type="submit" sx={{ p: "20px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* Línea divisoria decorativa */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
};

