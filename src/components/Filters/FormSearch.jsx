import { useState, useMemo } from "react";
import { Box, InputAdornment, Autocomplete, TextField, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import Swal from "sweetalert2";

function FormSearch({ setSelected, allValues, titleAlert }) {
  const { products: suggestions = [] } = useSelector((state) => state.products);
  const [inputValue, setInputValue] = useState("");

  const normalizeText = (text) =>
    (text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

  const searchOptions = useMemo(
    () =>
      suggestions.map((option) => ({
        ...option,
        searchKey: normalizeText(`${option.tag || ""} ${option.name || ""}`),
      })),
    [suggestions]
  );

  const filteredOptions = useMemo(() => {
    const normalizedInput = normalizeText(inputValue);
    return normalizedInput
      ? searchOptions.filter((option) => option.searchKey.includes(normalizedInput))
      : searchOptions;
  }, [inputValue, searchOptions]);

  const handleChange = (_, value) => {
    if (!value) return;

    if (allValues.some((item) => item._id === value._id)) {
      Swal.fire({ title: titleAlert, timer: 2000, icon: "error" });
      return;
    }
    setSelected(value);
    setInputValue("");
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Autocomplete
        options={filteredOptions}
        inputValue={inputValue}
        onInputChange={(_, newValue) => setInputValue(newValue)}
        getOptionLabel={(option) => `${option.tag ? option.tag + " - " : ""}${option.name || ""}`}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Buscar producto..."
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <ListItem {...props} sx={{ py: 1 }}>
            <ListItemText primary={<Typography color="success"> <strong>{option.tag ? `${option.tag} - ` : ""}</strong>{option.name}</Typography>} />
          </ListItem>
        )}
        noOptionsText={<ListItem sx={{ fontSize: 14, color: "text.secondary" }}>No se encontraron resultados</ListItem>}
      />
    </Box>
  );
}

export default FormSearch;
