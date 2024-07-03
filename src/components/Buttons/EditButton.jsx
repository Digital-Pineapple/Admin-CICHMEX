import React from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green } from '@mui/material/colors';
import { Tooltip } from '@mui/material';

const EditButton = ({title, callbackToEdit}) => {

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            denyButtonText:'Cancelar',
            confirmButtonText: "Continuar",
            confirmButtonColor:green[600]
          }).then((result) => {
            if (result.isConfirmed) {
                callbackToEdit()
            } else if (result.isDenied) {
              Swal.fire("CANCELADO", "", "error");
            }
          });
    
       
    };

    return (
        <>
        <Tooltip title='Editar'>

                <GridActionsCellItem
                color='info'
                onClick={() => ModalSweet()}
                icon={<Edit/>}
                >
                </GridActionsCellItem>
        </Tooltip>
        </>
    )
}

export default EditButton
