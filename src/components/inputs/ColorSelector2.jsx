import React, { useEffect, useState } from 'react'
import { useProducts } from '../../hooks'
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// Componente principal que permite seleccionar un color de una lista
const ColorSelector2 = ({}) => {
  // Estado para almacenar el color seleccionado
  const [selectedColor, setSelectedColor] = useState();

  // Hook personalizado para cargar los colores desde el contexto o API
  const {loadColors, colors} = useProducts()

  // useEffect para cargar los colores al montar el componente
  useEffect(() => {
    loadColors() // Llama a la función para cargar los colores
  }, [])

  // Función para manejar el cambio de selección en el selector
  const handleChange = (event) => {
    setSelectedColor(event.target.value); // Actualiza el estado con el color seleccionado
  };

  return (
    <>
    {/* Contenedor principal con un ancho mínimo */}
    <Box sx={{ minWidth: 200 }}>
      {/* Control de formulario para el selector */}
      <FormControl fullWidth>
        {/* Etiqueta del selector */}
        <InputLabel id="color-selector">Color</InputLabel>
        {/* Selector de colores */}
        <Select
          labelId="color-selector"
          id="color-selector"
          value={selectedColor} // Valor actual del selector
          label="Color"
          onChange={handleChange} // Maneja el cambio de selección
        >
          {/* Mapea la lista de colores para crear las opciones del selector */}
          {
            colors.map(color => {
              return (
                <MenuItem key={color._id} value={color}> 
                  {/* Muestra un Chip con el color y su nombre */}
                  <Chip style={{backgroundColor: color?.hex}}/> {color.name}
                </MenuItem> 
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
    </>
  )
}

export default ColorSelector2
