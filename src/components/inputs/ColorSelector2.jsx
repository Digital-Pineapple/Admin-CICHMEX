import React, { useEffect, useState } from 'react'
import { useProducts } from '../../hooks'
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ColorSelector2 = ({}) => {
    const [selectedColor, setSelectedColor] = useState();
    const {loadColors, colors} = useProducts()
    useEffect(() => {
    loadColors()
    }, [])
    const handleChange = (event) => {
        setSelectedColor(event.target.value);
      };
  return (
    <>
    <Box sx={{ minWidth: 200 }}>
    <FormControl fullWidth>
      <InputLabel id="color-selector">Color</InputLabel>
      <Select
        labelId="color-selector"
        id="color-selector"
        value={selectedColor}
        label="Color"
        onChange={handleChange}
      >
        {
            colors.map(color=>{
                return(
                <MenuItem key={color._id} value={color}> <Chip style={{backgroundColor:color?.hex}}/> {color.name}</MenuItem> 
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
