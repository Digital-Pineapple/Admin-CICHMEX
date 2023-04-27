import { Modal } from 'antd';
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const redirectPages = (navigate, route) => {
    navigate(route)
}


const alerConfirm = (title) => {
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
}

export { redirectPages, alerConfirm };