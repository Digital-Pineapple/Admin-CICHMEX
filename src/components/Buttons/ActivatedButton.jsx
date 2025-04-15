import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';

// Componente principal que representa un botón para activar un elemento.
// Recibe dos props: 
// - title: El título que se mostrará en el modal de confirmación.
// - callbackActivatedItem: Función que se ejecutará cuando el usuario confirme la activación.
const ActivatedButton = ({ title, callbackActivatedItem }) => {

  // Función que muestra un modal de confirmación utilizando SweetAlert2.
  // Permite al usuario confirmar o cancelar la activación del elemento.
  const ModalSweet = () => {
    Swal.fire({
      title: title,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      confirmButtonText: "Activar",
      confirmButtonColor: green[700]
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se ejecuta la función de activación y se muestra un mensaje de éxito.
        callbackActivatedItem();
        Swal.fire({
          title: 'Activado con éxito',
          icon: 'success',
          confirmButtonColor: green[800],
          timer: 3000,
          timerProgressBar: true
        });
      } else if (result.isDenied) {
        // Si el usuario cancela, se muestra un mensaje de cancelación.
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

  // Renderiza un botón que, al hacer clic, muestra el modal de confirmación.
  return (
    <>
      <Button
        color='success'
        onClick={() => ModalSweet()}
        title='Activar Punto de entrega'
        startIcon={<Add />}
        variant='contained'
        fullWidth
      >
        Activar punto de entrega
      </Button>
    </>
  );
};

export default ActivatedButton;
