import React from 'react'
import { ExclamationCircleFilled, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useNavigate } from 'react-router-dom';
import { redirectPages } from '../helpers/helpers';
import Success from './SuccesAlert';
const { confirm } = Modal;


const showConfirm = (title) => {
    confirm({
        title,
        icon: <ExclamationCircleFilled />,
        onOk(){
            alert("Ok")
        },
        onCancel() {
            console.log("Cancelar")
        }
    });
};


const WarningAlert = ({route, title}) => {

    const navigate = useNavigate ();  


    return (
        <Space wrap>
            <Button
                onClick={()=>redirectPages(navigate,route)}
                icon={<EditTwoTone twoToneColor="#0000ff" />}
            />
            <Button
                icon={<DeleteTwoTone twoToneColor="#FF0000" />}
                onClick={()=>showConfirm(title)}
            />
        </Space>
    )
}

export default WarningAlert
