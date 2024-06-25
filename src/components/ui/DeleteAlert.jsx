import React from 'react'
import { DeleteTwoTone, EditTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useNavigate } from 'react-router-dom';
import { redirectPages, alerConfirm } from '../../helpers/';
import { IconButton } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';
const { confirm } = Modal;





const DeleteAlert = ({title, callbackToDeleteItem}) => {

    const ModalSweet = () => {
       
        Swal.fire({
            title: title,
            showDenyButton: true,
            denyButtonText:'Cancelar',
            confirmButtonText: "Eliminar",
          }).then((result) => {
            if (result.isConfirmed) {
                callbackToDeleteItem()
              Swal.fire("Eliminado", "", "info");
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
                >
              
                </GridActionsCellItem>
        </>
    )
}

export default DeleteAlert