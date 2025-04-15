import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useCategories } from "../../hooks/useCategories";

const InputSearch1 = (value) => {
  // Hook personalizado para manejar la búsqueda de categorías
  const { searchCategory } = useCategories();

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: {
      value: value, // Valor inicial del campo de búsqueda
    },
    onSubmit: (value) => {
      try {
        // Llama a la función de búsqueda con el valor ingresado
        searchCategory(value);
      } catch (error) {
        // Manejo de errores en caso de que falle la búsqueda
        console.log(error);
      }
    },
  });

  return (
    <Paper
      // Componente contenedor con estilos de Material-UI
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        // Campo de entrada para la búsqueda
        sx={{ ml: 1, flex: 1 }}
        id="value"
        name="value"
        value={formik.values.name} // Valor del campo manejado por Formik
        onChange={formik.handleChange} // Actualiza el valor en Formik al escribir
        placeholder="Buscar categoria" // Texto de ayuda en el campo
        inputProps={{ "aria-label": "Buscar categoria" }} // Accesibilidad
      />
      <IconButton
        // Botón para enviar el formulario
        type="submit"
        sx={{ p: "20px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider
        // Línea divisoria decorativa
        sx={{ height: 28, m: 0.5 }}
        orientation="vertical"
      />
    </Paper>
  );
};

export default InputSearch1;
