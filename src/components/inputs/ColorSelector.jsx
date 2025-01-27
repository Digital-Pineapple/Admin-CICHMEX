import * as React from 'react';
import { Box, TextField, Typography, Autocomplete, Button, createFilterOptions } from '@mui/material';

// Lista de 100 colores con sus nombres en español y formato hexadecimal
const colors = [
  { hex: '#FFFFFF', name: 'Blanco' }, 
  { hex: '#000000', name: 'Negro' }, 
  { hex: '#FF0000', name: 'Rojo' },
  { hex: '#00FF00', name: 'Verde' },
  { hex: '#0000FF', name: 'Azul' },
  { hex: '#FFFF00', name: 'Amarillo' },
  { hex: '#FF00FF', name: 'Fucsia' },
  { hex: '#00FFFF', name: 'Cian' },
  { hex: '#800000', name: 'Marron' },
  { hex: '#808000', name: 'Oliva' },
  { hex: '#FFA500', name: 'Naranja' },
  { hex: '#FFC0CB', name: 'Rosa claro' },
  { hex: '#FFD700', name: 'Oro' },
  { hex: '#000080', name: 'Azul Marino' },
  { hex: '#ADD8E6', name: 'Celeste' },
  { hex: '#FF4500', name: 'Tomate' },
  { hex: '#D2691E', name: 'Chocolate' },
  { hex: '#87CEEB', name: 'Cielo' },
  { hex: '#4682B4', name: 'Acero' },
  { hex: '#556B2F', name: 'Oliva oscuro' },
  { hex: '#32CD32', name: 'Lima' },
  { hex: '#696969', name: 'Gris oscuro' },
  { hex: '#D3D3D3', name: 'Gris claro' },
  { hex: '#A9A9A9', name: 'Gris medio' },
  { hex: '#C0C0C0', name: 'Plata' },
  { hex: '#B8860B', name: 'Oro viejo' },
  { hex: '#B22222', name: 'Fuego' },
  { hex: '#7FFF00', name: 'Lima fuerte' },
  { hex: '#F4A460', name: 'Arena' },
  { hex: '#ADFF2F', name: 'Verde claro' },
  { hex: '#FA8072', name: 'Salmon' },
  { hex: '#8B4513', name: 'Siena' },
  { hex: '#5F9EA0', name: 'Cadete' },
  { hex: '#FAF0E6', name: 'Lino' },
  { hex: '#EEE8AA', name: 'Maiz' },
  { hex: '#FFFACD', name: 'Limon' },
  { hex: '#FFE4B5', name: 'Arena clara' },
  { hex: '#DEB887', name: 'Madera' },
  { hex: '#FF6347', name: 'Coral' },
  { hex: '#DDA0DD', name: 'Orquidea' },
  { hex: '#9370DB', name: 'Purpura' },
  { hex: '#00FA9A', name: 'Primavera' },
  { hex: '#87CEFA', name: 'Cielo claro' },
  { hex: '#9400D3', name: 'Violeta' },
  { hex: '#EE82EE', name: 'Lila' },
  { hex: '#FFB6C1', name: 'Rosado' },
  { hex: '#8B0000', name: 'Vino' },
  { hex: '#CD5C5C', name: 'Indio' },
  { hex: '#8B008B', name: 'Magenta' },
  { hex: '#1E90FF', name: 'Dodger' },
  { hex: '#F08080', name: 'Coral rosado' },
  { hex: '#98FB98', name: 'Palido' }, 
  { hex: '#808080', name: 'Gris' },
  { hex: '#87CEEB', name: 'Cielo azul' },
  { hex: '#FFB6C1', name: 'Rosado' },
  { hex: '#FFDAB9', name: 'Durazno' },
  { hex: '#FFFACD', name: 'Limon pastel' },
  { hex: '#E0FFFF', name: 'Cian claro' },
  { hex: '#F0E68C', name: 'Caqui claro' },
  { hex: '#D8BFD8', name: 'Cardo' },
  { hex: '#E6E6FA', name: 'Lavanda' },
  { hex: '#FAFAD2', name: 'Amarillo pálido' },
  { hex: '#F5FFFA', name: 'Menta suave' },
  { hex: '#F0FFF0', name: 'Verde miel' },
  { hex: '#F5DEB3', name: 'Trigo' },
  { hex: '#FFF5EE', name: 'Blanco melón' },
  { hex: '#FFE4E1', name: 'Blanco rosado' },
  { hex: '#E4007C', name: 'Rosa Mexicano' },
  { hex: '#EE82EE', name: 'Violeta claro' },
  { hex: '#9400D3', name: 'Violeta' },
  { hex: '#FF69B4', name: 'Rosa intenso' },
  { hex: '#FF1493', name: 'Rosa fuerte' },
  { hex: '#8A2BE2', name: 'Azul violeta' },
  { hex: '#2E8B57', name: 'Verde mar' },
  { hex: '#5F9EA0', name: 'Cadete' },
  { hex: '#32CD32', name: 'Verde lima' },
  { hex: '#7FFF00', name: 'Lima fuerte' },
  { hex: '#B22222', name: 'Fuego' },
];


const filter = createFilterOptions();

const ColorSelector = ({
  value,
  onChange,
  fullWidth,
  disabled,
  label,
  error,
  helperText,
}) => {
  
  const [selectedValue, setSelectedValue] = React.useState(null);

  React.useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);
  
  return (
    <Autocomplete
      value={selectedValue}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.stopPropagation();
        }
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          const existingColor = colors.find(
            (color) => color.name.toLowerCase() === newValue.toLowerCase()
          );
          const finalValue = existingColor || { name: newValue };
          setSelectedValue(finalValue);
          onChange(finalValue);
        } else if (newValue && newValue.inputValue) {
          const finalValue = { name: newValue.inputValue };
          setSelectedValue(finalValue);
          onChange(finalValue);
        } else {
          setSelectedValue(newValue);
          onChange(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue.toLowerCase() === option.name.toLowerCase()
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: inputValue,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={colors}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box component="li" {...optionProps} sx={{ display: "flex", alignItems: "center" }}>
            {option.hex && (
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "100px",
                  backgroundColor: option.hex,
                  marginRight: 2,
                  border: "1px solid white",
                }}
              />
            )}
            <Typography fontSize={"15px"}>{option.name}</Typography>
          </Box>
        );
      }}
      sx={{ width: fullWidth ? "100%" : 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          disabled={disabled}
          error={error}
          helperText={helperText}
          size="small"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.stopPropagation();
            }
          }}
        />
      )}
    />
  );
};

export default ColorSelector