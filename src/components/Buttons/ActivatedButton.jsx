import { Button } from '@mui/material';
import { Add, } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';


const ActivatedButton = ({title, callbackActivatedItem}) => {

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            denyButtonText:'Cancelar',
            confirmButtonText: "Activar",
            confirmButtonColor: green[700]
          }).then((result) => {
            if (result.isConfirmed) {
                callbackActivatedItem()
                Swal.fire({
                    title:'Activado con éxito',
                    icon:'success',
                    confirmButtonColor:green[800],
                    timer:3000,
                    timerProgressBar:true
    
                  });
            } else if (result.isDenied) {
              Swal.fire({
                title:'Cancelado',
                icon:'error',
                confirmButtonColor:red[900],
                timer:2000,
                timerProgressBar:true

              });
            }
          });
    
       
    };

    return (
        <>
                <Button
                color='success'
                onClick={() => ModalSweet()}
                title='Activar Punto de entrega'
                startIcon={<Add/>}
                variant='contained'
                fullWidth
                >
                Activar punto de entrega
                </Button>
        </>
    )
}

export default ActivatedButton
