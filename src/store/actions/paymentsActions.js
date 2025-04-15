import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { startLoading, stopLoading } from "../reducer/uiReducer"

// Acción para validar pagos expirados
export const startValidateExpiredPayments = () => {
    return async (dispatch) => {
        // Inicia el estado de carga
        dispatch(startLoading())
        try {
            // Realiza una solicitud GET a la API para obtener los pagos expirados
            const {data} = await instanceApi.get(`/payments/expired/sales`,{
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Token de autenticación
                },
            })
            
            // Muestra una notificación de éxito con el mensaje recibido de la API
            enqueueSnackbar(`${data.message}`, {variant:'success', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
        } catch (error) {
            // Manejo de errores (por ahora solo se imprime en la consola)
            console.log(error)
        } finally {
            // Finaliza el estado de carga
            dispatch(stopLoading())
        }
    }
}