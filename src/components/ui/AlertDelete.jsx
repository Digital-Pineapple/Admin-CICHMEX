import React from 'react'
import { DeleteTwoTone, EditTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import {  Modal, Space } from "antd";
import { useNavigate } from 'react-router-dom';
import { redirectPages, alerConfirm } from '../../helpers/';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
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


const AlertDelete = ({ title, callbackToDeleteItem}) => {

    return (
        <>
            
            <IconButton onClick={() => alerConfirm(title, callbackToDeleteItem)}>
  
  <Delete/>
</IconButton>

        </>
    )
}


export default AlertDelete
