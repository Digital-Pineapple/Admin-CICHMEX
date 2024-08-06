import { useState } from "react";
import { TextField, Box, Typography, List, ListItem, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import Swal from "sweetalert2";

function FormSearch({ setSelected, allValues, titleAlert }) {
  const [value, setValue] = useState("");
  const { products: suggestions = [] } = useSelector((state) => state.products);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  function handleChange(e) {
    let value = e.target.value;
    setValue(value);
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function onClickSuggestion(suggestion) {
    if (allValues.includes(suggestion)) {
      Swal.fire({
        title:titleAlert,
        timer:2000,
        icon:'error',
        
      })
      return
    }
    setSelected(suggestion);
    setValue('');
    setShowSuggestions(false);
  }

  const filterSuggestions = () => {
    return suggestions.filter((suggestion) => {
      return (
        suggestion?.name?.toLowerCase().includes(value?.toLowerCase().trim()) ||
        suggestion?.tag?.toLowerCase().includes(value?.toLowerCase().trim())
      );
    });
  };

  const renderSuggestions = () => {
    const filteredSuggestions = filterSuggestions();
    if (filteredSuggestions.length === 0) {
      return <ListItem>No hay sugerencias</ListItem>;
    }
    return filteredSuggestions.slice(0, 6)?.map((suggestion, index) => {
      return (
        <ListItem
          onClick={() => onClickSuggestion(suggestion)}
          sx={{
            fontSize: "16px",
            padding: "10px 5px 5px 10px",
            cursor: "pointer",
            backgroundColor: index === activeSuggestionIndex ? "#b0bec5" : "",
          }}
          key={index}
        >
          {suggestion.tag + "-" + suggestion.name}
        </ListItem>
      );
    });
  };

  const handleKeyDown = (e) => {
    const filteredSuggestions = filterSuggestions();
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        onClickSuggestion(filteredSuggestions[activeSuggestionIndex]);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div>
          <TextField
            id="name"
            name="name"
            variant="outlined"
            size="medium"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            fullWidth
            placeholder="Nombre de producto"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          {showSuggestions && (
            <List
              sx={{
                position: "absolute",
                zIndex: 2,
                listStyle: "none",
                color: "white",
                borderRadius: "4px",
                padding: "0px",
                margin: "0px",
                backgroundColor: "#0d2b6b",
                width: "100%",
              }}
            >
              {renderSuggestions()}
            </List>
          )}
        </div>
      </Box>
    </>
  );
}

export default FormSearch;
