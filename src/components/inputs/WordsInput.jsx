import * as React from 'react';
import { Box, TextField, Chip, FormControl } from '@mui/material';

export default function WordsInput({ formik, id, name, label, keywords }) {
  const [inputValue, setInputValue] = React.useState('');
  const [chips, setChips] = React.useState(keywords ? keywords : []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      const newChips = [...chips, inputValue.trim()];
      setChips(newChips);
      formik.setFieldValue(name, newChips); // Guarda el arreglo de palabras en Formik
      setInputValue(''); // Limpia el campo de entrada
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const newChips = chips.filter((chip) => chip !== chipToDelete);
    setChips(newChips);
    formik.setFieldValue(name, newChips); // Actualiza Formik
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField
        id={id}
        name={name}
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
        fullWidth
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={handleDelete(chip)}
          />
        ))}
      </Box>
    </FormControl>
  );
}
