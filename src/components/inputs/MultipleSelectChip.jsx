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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(i, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(i) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({v, formik, id, name}) {
  const theme = useTheme()  
  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={formik.handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <FieldArray name={name}>
            {({ push, remove }) => (
              <Select
                labelId={id}
                id={id}
                multiple
                value={values[name]} // Usar formik values
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
                }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip key={index} label={value} onDelete={() => remove(index)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {v?.map((i) => (
                  <MenuItem
                    key={i}
                    value={i}
                    style={getStyles(i, values[name], theme)}
                    onClick={() => push(i)}
                  >
                    {i}
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
