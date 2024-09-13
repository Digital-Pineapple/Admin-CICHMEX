import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { startLoading, stopLoading } from "../reducer/uiReducer"



export const startValidateExpiredPayments = () => {
    return async (dispatch) => {
        dispatch(startLoading())
        try {
            const {data} = await instanceApi.get(`/payments/expired/sales`,{
                headers: {
                    "Content-type": "application/json",
                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            })
            enqueueSnackbar(`${data.message}`, {variant:'success', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
        } catch (error) {
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }

    }
}