import { Modal } from 'antd';
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const redirectPages = (navigate, route) => {
    navigate(route)
}


const alerConfirm = (title, callbackToDeleteItem) => {
    confirm({
        title,
        icon: <ExclamationCircleFilled />,
        onOk() {
            callbackToDeleteItem()
        },
        onCancel() {
            console.log("Cancelar")
        }
    });
}

export { redirectPages, alerConfirm };