import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

const CheckList = ({}) => {
  // Estado para almacenar los elementos seleccionados
  const [checked, setChecked] = useState([0]);
  // Estado para determinar si todos los elementos están completos
  const [isComplete, setIsComplete] = useState(false);

  // Función para manejar el cambio de selección de los checkboxes
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value); // Verifica si el valor ya está seleccionado
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value); // Agrega el valor si no está seleccionado
    } else {
      newChecked.splice(currentIndex, 1); // Elimina el valor si ya está seleccionado
    }

    setChecked(newChecked); // Actualiza el estado con los valores seleccionados
  };

  useEffect(() => {
    // Verifica si todos los elementos están seleccionados
    if (checked.length === 5) {
      setIsComplete(true); // Marca como completo si todos los elementos están seleccionados
    } else {
      setIsComplete(false); // Marca como incompleto si falta algún elemento
    }
  }, [checked]);

  // Función para manejar el envío del formulario
  const submitValue = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setVerify(true); // Marca como verificado (debes definir `setVerify` en tu código)
    sendVerify(); // Llama a la función para enviar la verificación (debes definir `sendVerify`)
  };

  return (
    <Box component='form' onSubmit={submitValue}>
      {/* Lista de elementos con checkboxes */}
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {['Identificacion Oficial', 'Comprobante de Domicilio', 'Antecedentes Penales', 'Curp'].map((value) => {
          const labelId = `${value}`; // Identificador único para cada elemento

          return (
            <ListItem
              key={value}
              secondaryAction={
                // Botón de comentarios (actualmente no tiene funcionalidad)
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              {/* Botón de lista que contiene el checkbox y el texto */}
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  {/* Checkbox para seleccionar o deseleccionar el elemento */}
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1} // Verifica si el elemento está seleccionado
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                {/* Texto del elemento */}
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {/* Botón de verificación: habilitado solo si todos los elementos están seleccionados */}
      {checked.length === 5 ? (
        <Button type='submit' variant='outlined'>
          Verificar
        </Button>
      ) : (
        <Button variant='contained' disabled>
          Verificar
        </Button>
      )}
    </Box>
  );
};

export default CheckList;
