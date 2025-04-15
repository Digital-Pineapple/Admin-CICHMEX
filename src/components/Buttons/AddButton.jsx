import React, { useState } from 'react'
import { Box, Button, IconButton, Modal, Tooltip, Typography, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';
import { Controller, useForm } from 'react-hook-form';
import { useStoreHouse } from '../../hooks/useStoreHouse';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px  #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 5,
};

// Componente principal que representa un botón para agregar stock a un producto
const AddButton = ({ title, text, product }) => {

  // Estado para controlar la apertura del formulario modal
  const [openForm, setopenForm] = useState(false);
  const handleOpen = () => setopenForm(true);
  const handleClose = () => setopenForm(false);

  // Hook personalizado para manejar la lógica de creación de stock
  const { createStockProduct } = useStoreHouse();

  // Hook para manejar formularios con react-hook-form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      stock: '',
      product_id: product ? product._id : '',
    }
  });

  // Función para enviar la información del formulario
  const sendInfo = async (data) => {
    createStockProduct(data);
    handleClose();
    reset();
  };

  // Función para mostrar un modal de confirmación utilizando SweetAlert2
  const ModalSweet = () => {
    Swal.fire({
      title: title,
      text: text,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      confirmButtonText: "Agregar",
      confirmButtonColor: green[700]
    }).then((result) => {
      if (result.isConfirmed) {
        handleOpen();
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Cancelado',
          icon: 'error',
          confirmButtonColor: red[900],
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  // Función de validación para asegurar que el valor sea mayor a 0
  const validateGreaterThanZero = (value) => {
    return parseInt(value) > 0 || "El valor debe ser mayor a 0";
  };

  return (
    <>
      {/* Botón principal con un tooltip que abre el modal de confirmación */}
      <Tooltip title={title ? title : ''}>
        <Button
          color='success'
          onClick={() => ModalSweet()}
          title='Activar Punto de entrega'
          variant='contained'
          fullWidth
        >
          Agregar al almacen
        </Button>
      </Tooltip>

      {/* Modal que contiene el formulario para agregar stock */}
      <Modal
        open={openForm}
        onClose={handleClose}
        component={'form'}
        onSubmit={handleSubmit(sendInfo)}
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            Agregar Stock {product?.name}
          </Typography>
          {/* Campo de entrada para la cantidad de stock */}
          <Controller
            name="stock"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
              validate: validateGreaterThanZero
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                label="Cantidad"
                fullWidth
                sx={{ marginY: '20px' }}
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />
          {/* Botón para enviar el formulario */}
          <Button variant="contained" type="submit" fullWidth color="primary">
            Agregar stock
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddButton;
