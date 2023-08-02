import React from 'react'
import { DeleteTwoTone, EditTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useNavigate } from 'react-router-dom';
import { redirectPages, alerConfirm } from '../../helpers/';
import { IconButton } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
const { confirm } = Modal;


const showConfirm = (title) => {
    confirm({
        title,
        onOk() {
            alert("Ok")
        },
        onCancel() {
            console.log("Cancelar")
        }
    });
};


const WarningAlert = ({ route, title, callbackToDeleteItem}) => {

    const navigate = useNavigate();


    return (
        <>
                <IconButton
                onClick={() => alerConfirm(title, callbackToDeleteItem)}
                >
                <DeleteTwoTone/>
                </IconButton>
                <GridActionsCellItem icon={<Edit/>} label="Edit" showInMenu />,

        </>
    )
}

export default WarningAlert
