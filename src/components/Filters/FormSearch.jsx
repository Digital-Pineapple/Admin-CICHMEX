import { useState, useMemo } from "react";
import { Box, InputAdornment, Autocomplete, TextField, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import Swal from "sweetalert2";

function FormSearch({ setSelected, allValues, titleAlert }) {
  // Obtiene la lista de productos del estado global usando Redux
  const { products: suggestions = [] } = useSelector((state) => state.products);

  // Estado local para manejar el valor del input de búsqueda
  const [inputValue, setInputValue] = useState("");

  // Función para normalizar texto (elimina acentos, espacios extra y lo convierte a minúsculas)
  const normalizeText = (text) =>
    (text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

  // Genera una lista de opciones de búsqueda con una clave de búsqueda normalizada
  const searchOptions = useMemo(
    () =>
      suggestions.map((option) => ({
        ...option,
        searchKey: normalizeText(`${option.tag || ""} ${option.name || ""}`),
      })),
    [suggestions]
  );

  // Filtra las opciones de búsqueda según el valor ingresado en el input
  const filteredOptions = useMemo(() => {
    const normalizedInput = normalizeText(inputValue);
    return normalizedInput
      ? searchOptions.filter((option) => option.searchKey.includes(normalizedInput))
      : searchOptions;
  }, [inputValue, searchOptions]);

  // Maneja el evento de selección de una opción
  const handleChange = (_, value) => {
    if (!value) return;

    // Verifica si el elemento ya está seleccionado
    if (allValues.some((item) => item._id === value._id)) {
      Swal.fire({ title: titleAlert, timer: 2000, icon: "error" }); // Muestra una alerta si ya está seleccionado
      return;
    }
    setSelected(value); // Establece el valor seleccionado
    setInputValue(""); // Limpia el valor del input
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Componente Autocomplete para la búsqueda */}
      <Autocomplete
        options={filteredOptions} // Opciones filtradas
        inputValue={inputValue} // Valor actual del input
        onInputChange={(_, newValue) => setInputValue(newValue)} // Maneja cambios en el input
        getOptionLabel={(option) => `${option.tag ? option.tag + " - " : ""}${option.name || ""}`} // Etiqueta de las opciones
        onChange={handleChange} // Maneja la selección de una opción
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Buscar producto..." // Placeholder del input
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <Search /> {/* Icono de búsqueda */}
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <ListItem {...props} sx={{ py: 1 }}>
            {/* Renderiza cada opción con formato */}
            <ListItemText
              primary={
                <Typography color="success">
                  <strong>{option.tag ? `${option.tag} - ` : ""}</strong>
                  {option.name}
                </Typography>
              }
            />
          </ListItem>
        )}
        noOptionsText={
          // Texto mostrado cuando no hay resultados
          <ListItem sx={{ fontSize: 14, color: "text.secondary" }}>
            No se encontraron resultados
          </ListItem>
        }
      />
    </Box>
  );
}

export default FormSearch;
