import React from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { green } from '@mui/material/colors';

const DeleteAlert = ({title, callbackToDeleteItem, disabled}) => {

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            denyButtonText:'Cancelar',
            confirmButtonText: "Eliminar",
            confirmButtonColor:green[700]
          }).then((result) => {
            if (result.isConfirmed) {
                callbackToDeleteItem()
            } else if (result.isDenied) {
              Swal.fire("No se elimino", "", "error");
            }
          });
    
       
    };

    return (
        <>
                <GridActionsCellItem
                color='warning'
                onClick={() => ModalSweet()}
                icon={<Delete/>}
                disabled={disabled === true ? disabled:false}
                >
              
                </GridActionsCellItem>
        </>
    )
}

export default DeleteAlert