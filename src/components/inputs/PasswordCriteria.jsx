import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordCriteria = ({ password }) => {
  // Definimos cada condición y su validación usando regex o comparaciones
  const conditions = [
    {
      label: 'Mínimo 8 caracteres',
      valid: password.length >= 8,
    },
    {
      label: 'Al menos una letra mayúscula',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'Al menos una letra minúscula',
      valid: /[a-z]/.test(password),
    },
    {
      label: 'Al menos un número',
      valid: /\d/.test(password),
    },
    {
      label: 'Al menos un carácter especial',
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <Box display={password ? 'block':'none'} >
      <List>
        {conditions.map((cond, index) => (
          <ListItem key={index} sx={{ color: cond.valid ? 'green' : 'red' }}>
            {cond.valid ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
            <Typography variant="body2" ml={1}>
              {cond.label}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PasswordCriteria;
