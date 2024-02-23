import { Modal } from 'antd';


const { confirm } = Modal;

const redirectPages = (navigate, route) => {
    navigate(route,{replace:true})
}



const alerConfirm = (title, callbackToDeleteItem) => {
    confirm({
        title,
        
        onOk() {
            callbackToDeleteItem()
        },
        onCancel() {
            console.log("Cancelar")
        }
    });
}

export { redirectPages, alerConfirm };