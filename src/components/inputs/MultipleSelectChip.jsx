import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FieldArray, Formik } from 'formik';

// Constantes para configurar el estilo del menú desplegable
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, // Altura máxima del menú
      width: 250, // Ancho del menú
    },
  },
};

// Función para determinar el estilo de cada elemento del menú
function getStyles(i, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(i) === -1
        ? theme.typography.fontWeightRegular // Peso de fuente regular si no está seleccionado
        : theme.typography.fontWeightMedium, // Peso de fuente medio si está seleccionado
  };
}

// Componente principal para un selector múltiple con chips
export default function MultipleSelectChip({ v, formik, id, name }) {
  const theme = useTheme(); // Hook para acceder al tema de Material-UI

  return (
    <Formik
      initialValues={formik.initialValues} // Valores iniciales del formulario
      onSubmit={formik.handleSubmit} // Función de envío del formulario
    >
      {({ setFieldValue, values }) => (
        <FormControl sx={{ m: 1, width: 300 }}> {/* Contenedor del selector */}
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> {/* Etiqueta del selector */}
          <FieldArray name={name}> {/* Componente de Formik para manejar arreglos */}
            {({ push, remove }) => (
              <Select
                labelId={id} // ID de la etiqueta asociada
                id={id} // ID del selector
                multiple // Permitir selección múltiple
                value={values[name]} // Valores seleccionados del formulario
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  // Actualizar el valor del campo en Formik
                  setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />} // Entrada personalizada
                renderValue={(selected) => (
                  // Renderizar los valores seleccionados como chips
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip
                        key={index} // Clave única para cada chip
                        label={value} // Texto del chip
                        onDelete={() => remove(index)} // Eliminar chip al hacer clic en el ícono de cierre
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps} // Propiedades del menú desplegable
              >
                {v?.map((i) => (
                  <MenuItem
                    key={i} // Clave única para cada elemento del menú
                    value={i} // Valor del elemento
                    style={getStyles(i, values[name], theme)} // Estilo del elemento
                    onClick={() => push(i)} // Agregar elemento al arreglo al hacer clic
                  >
                    {i} {/* Texto del elemento */}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FieldArray>
        </FormControl>
      )}
    </Formik>
  );
}
