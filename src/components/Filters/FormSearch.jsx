import { useState } from "react";
import { TextField, Box, List, ListItem, InputAdornment } from "@mui/material";
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
    setShowSuggestions(value.trim() !== "");
  }

  function onClickSuggestion(suggestion) {
    if (allValues.includes(suggestion)) {
      Swal.fire({
        title: titleAlert,
        timer: 2000,
        icon: "error",
      });
      return;
    }
    setSelected(suggestion);
    setValue("");
    setShowSuggestions(false);
  }

  const filterSuggestions = () => {
    const lowerCaseValue = value.toLowerCase().trim();
    return suggestions
      .filter((suggestion) => {
        const nameMatch = suggestion?.name?.toLowerCase().includes(lowerCaseValue);
        const tagMatch = suggestion?.tag?.toLowerCase().includes(lowerCaseValue);
        return nameMatch || tagMatch;
      })
      .sort((a, b) => {
        const aNameStartsWith = a.name.toLowerCase().startsWith(lowerCaseValue);
        const bNameStartsWith = b.name.toLowerCase().startsWith(lowerCaseValue);
        const aTagStartsWith = a.tag.toLowerCase().startsWith(lowerCaseValue);
        const bTagStartsWith = b.tag.toLowerCase().startsWith(lowerCaseValue);

        if (aNameStartsWith || aTagStartsWith) return -1;
        if (bNameStartsWith || bTagStartsWith) return 1;
        return 0;
      });
  };

  const renderSuggestions = () => {
    const filteredSuggestions = filterSuggestions();
    if (filteredSuggestions.length === 0) {
      return <ListItem>No hay sugerencias</ListItem>;
    }
    return filteredSuggestions.map((suggestion, index) => (
      <ListItem
        onClick={() => onClickSuggestion(suggestion)}
        sx={{
          fontSize: "16px",
          padding: "10px 5px 5px 10px",
          cursor: "pointer",
          backgroundColor: index === activeSuggestionIndex ? "#b0bec5" : "",
          fontWeight: index === 0 ? "bold" : "normal", 
        }}
        key={index}
      >
        {suggestion.tag + " - " + suggestion.name}
      </ListItem>
    ));
  };

  const handleKeyDown = (e) => {
    const filteredSuggestions = filterSuggestions();
    if (e.key === "ArrowDown" && activeSuggestionIndex < filteredSuggestions.length - 1) {
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    } else if (e.key === "ArrowUp" && activeSuggestionIndex > 0) {
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        onClickSuggestion(filteredSuggestions[activeSuggestionIndex]);
      }
    }
  };

  return (
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
            ),
          }}
        />
        {showSuggestions && (
          <List
            sx={{
              position: "absolute",
              zIndex: 2,
              color: "white",
              borderRadius: "4px",
              padding: "0px",
              margin: "0px",
              backgroundColor: "#0d2b6b",
              width: "100%",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {renderSuggestions()}
          </List>
        )}
      </div>
    </Box>
  );
}

export default FormSearch;
