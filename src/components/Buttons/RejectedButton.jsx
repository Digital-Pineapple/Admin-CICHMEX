import { Button, IconButton } from '@mui/material';
import { Add, Cancel, Verified, } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';

// Componente principal que representa un botón para rechazar con un modal de confirmación
const RejectedButton = ({ title, callbackAction, text, textButton, inputText, inputLabel, values }) => {

  // Función que muestra un modal utilizando SweetAlert2 para confirmar o cancelar la acción
  const ModalSweet = () => {
    Swal.fire({
      title: title,
      showDenyButton: true,
      text: text,
      input: "text",
      inputLabel: inputLabel,
      denyButtonText: 'Cancelar',
      confirmButtonText: "Rechazar",
      confirmButtonColor: green[700]
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama a la acción de callback con los valores proporcionados si se confirma
        callbackAction({ id: values.id, createdAt: values.createdAt, notes: result.value })
      } else if (result.isDenied) {
        // Muestra un mensaje de cancelación si se niega la acción
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

  return (
    <>
      {/* Botón que activa el modal al hacer clic */}
      <Button
        aria-label="Ver detalle"
        color="warning"
        title={text}
        onClick={() => ModalSweet()}
        endIcon={<Cancel />}
        size='small'
        variant='contained'
      >
        {textButton}
      </Button>
    </>
  )
}

export default RejectedButton
