import { Button, IconButton } from '@mui/material';
import { Add, Verified, } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';


const SuccessButton = ({title, titleConfirm,callbackAction,text, textButton}) => {

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            text: text,
            // input:'text',
            // inputLabel:'¿Desea agregar comentarios?',
            denyButtonText:'Cancelar',
            confirmButtonText: "Confirmar",
            confirmButtonColor: green[700]
          }).then((result) => {
            if (result.isConfirmed) {
                 callbackAction()
                // Swal.fire({
                //     title:titleConfirm,
                //     icon:'success',
                //     confirmButtonColor:green[800],
                //     timer:3000,
                //     timerProgressBar:true
    
                //   });
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
          aria-label="Ver detalle"
          title={text}
          color={'success'}
          onClick={() => ModalSweet()}
          startIcon={<Verified />}
        >
         {textButton} 
        </Button> 
        </>
    )
}

export default SuccessButton
