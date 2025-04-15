import React from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green } from '@mui/material/colors';
import { Tooltip } from '@mui/material';

// Componente EditButton: Botón personalizado para editar elementos con un modal de confirmación.
const EditButton = ({title, callbackToEdit, disabled}) => {

  // Función ModalSweet: Muestra un modal de confirmación utilizando SweetAlert2.
  const ModalSweet = () => {
    Swal.fire({
      title: title, // Título del modal.
      showDenyButton: true, // Muestra el botón de "Cancelar".
      denyButtonText: 'Cancelar', // Texto del botón de "Cancelar".
      confirmButtonText: "Continuar", // Texto del botón de "Continuar".
      confirmButtonColor: green[600] // Color del botón de "Continuar".
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, ejecuta la función callbackToEdit.
        callbackToEdit()
      } else if (result.isDenied) {
        // Si se cancela, muestra un mensaje de cancelación.
        Swal.fire("CANCELADO", "", "error");
      }
    });
  };

  return (
    <>
      {/* Tooltip: Muestra un mensaje emergente al pasar el cursor sobre el botón. */}
      <Tooltip title='Editar'>
        {/* GridActionsCellItem: Botón de acción con ícono de edición. */}
        <GridActionsCellItem
          color='info'
          onClick={() => ModalSweet()} // Llama a la función ModalSweet al hacer clic.
          icon={<Edit/>} // Ícono de edición.
          disabled={disabled === true ? disabled : false} // Deshabilita el botón si la propiedad "disabled" es verdadera.
        >
        </GridActionsCellItem>
      </Tooltip>
    </>
  )
}

export default EditButton
