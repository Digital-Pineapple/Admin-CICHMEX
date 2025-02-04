import { useState, useMemo } from "react";
import { 
  Box, 
  InputAdornment,
  Autocomplete,
  TextField,
  ListItem,
  ListItemText
} from "@mui/material";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import Swal from "sweetalert2";
import { matchSorter } from 'match-sorter';

function FormSearch({ setSelected, allValues, titleAlert }) {
  const { products: suggestions = [] } = useSelector((state) => state.products);
  const [inputValue, setInputValue] = useState("");

  // Normalización de texto para búsqueda insensible
  const normalizeText = (text) => {
    return text
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim() || "";
  };

  // Opciones de búsqueda memoizadas
  const searchOptions = useMemo(() => 
    suggestions.map(option => ({
      ...option,
      searchKey: `${normalizeText(option.tag)} ${normalizeText(option.name)}`
    })), 
    [suggestions]
  );

  // Filtrado mejorado con match-sorter
  const filterOptions = (options, { inputValue }) => {
    const normalizedInput = normalizeText(inputValue);
    
    if (!normalizedInput) return options;
    
    return matchSorter(options, normalizedInput, {
      keys: ["searchKey"],
      threshold: matchSorter.rankings.CONTAINS,
      baseSort: (a, b) => {
        const aStarts = a.item.searchKey.startsWith(normalizedInput);
        const bStarts = b.item.searchKey.startsWith(normalizedInput);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return b.score - a.score;
      }
    });
  };

  const handleChange = (_, value) => {
    if (!value) return;
    
    if (allValues.some(item => item.id === value.id)) {
      Swal.fire({
        title: titleAlert,
        timer: 2000,
        icon: "error",
      });
      return;
    }
    
    setSelected(value);
    setInputValue("");
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Autocomplete
        options={searchOptions}
        inputValue={inputValue}
        onInputChange={(_, newValue) => setInputValue(newValue)}
        getOptionLabel={(option) => `${option.tag ? option.tag + " - " : ""}${option.name}`}
        filterOptions={filterOptions}
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
                <>
                 
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                 
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, option) => (
          <ListItem 
            {...props} 
            sx={{
              py: 1,
              "&.MuiAutocomplete-option": {
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover"
                }
              }
            }}
          >
            <ListItemText 
              primary={
                <span>
                  {option.tag && (
                    <strong style={{ color: "#1976d2" }}>
                      {option.tag} - 
                    </strong>
                  )}
                  {highlightMatch(option.name, inputValue)}
                </span>
              }
             
            />
          </ListItem>
        )}
        noOptionsText={
          <ListItem sx={{ fontSize: 14, color: "text.secondary" }}>
            No se encontraron resultados
          </ListItem>
        }
        sx={{
          "& .MuiAutocomplete-popper": {
            boxShadow: 3,
            borderRadius: 1,
            mt: 0.5,
            "& .MuiAutocomplete-listbox": {
              maxHeight: 250,
              py: 0
            }
          }
        }}
      />
    </Box>
  );
}

// Función para resaltar coincidencias
const highlightMatch = (text, query) => {
  if (!query) return text;
  
  const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const startIndex = normalizedText.indexOf(normalizedQuery);
  if (startIndex === -1) return text;

  const endIndex = startIndex + normalizedQuery.length;
  return (
    <span>
      {text.substring(0, startIndex)}
      <strong style={{ color: "#1976d2" }}>
        {text.substring(startIndex, endIndex)}
      </strong>
      {text.substring(endIndex)}
    </span>
  );
};

export default FormSearch;