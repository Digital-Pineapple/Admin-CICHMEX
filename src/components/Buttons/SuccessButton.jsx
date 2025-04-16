import { Button, IconButton } from '@mui/material';
import { Add, Verified, } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';

// Componente SuccessButton: Botón personalizado que muestra un modal de confirmación al hacer clic
const SuccessButton = ({title, titleConfirm, callbackAction, text, textButton}) => {

  // Función ModalSweet: Muestra un modal utilizando SweetAlert2 con opciones de confirmar o cancelar
  const ModalSweet = () => {
    Swal.fire({
      title: title,
      showDenyButton: true,
      text: text,
      denyButtonText: 'Cancelar',
      confirmButtonText: "Confirmar",
      confirmButtonColor: green[700]
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se ejecuta la acción pasada como prop
        callbackAction();
      } else if (result.isDenied) {
        // Si el usuario cancela, se muestra un mensaje de cancelación
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
        title={text}
        color={'success'}
        onClick={() => ModalSweet()}
        variant='contained'
        startIcon={<Verified />}
        size='small'
      >
        {textButton} 
      </Button> 
    </>
  );
}

export default SuccessButton;
