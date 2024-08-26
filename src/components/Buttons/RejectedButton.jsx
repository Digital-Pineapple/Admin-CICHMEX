import { Button, IconButton } from '@mui/material';
import { Add, Cancel, Verified, } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green, red } from '@mui/material/colors';


const RejectedButton = ({title,callbackAction,text, textButton, inputText, inputLabel, values}) => {

    
    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            text: text,
            input:"text",
            inputLabel:inputLabel,
            denyButtonText:'Cancelar',
            confirmButtonText: "Rechazar",
            confirmButtonColor: green[700]
          }).then((result) => {
            if (result.isConfirmed) {
                 callbackAction({id:values.id,createdAt:values.createdAt,notes:result.value})
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
          color="warning"
          title={text}
          onClick={() => ModalSweet()}
          endIcon={<Cancel/>}

        >
         {textButton} 
        </Button> 
        </>
    )
}

export default RejectedButton
