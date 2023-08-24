import Cookies from "js-cookie"
import { instanceApi } from "../../apis/configAxios"
import { loadCustomers, loadCustomer, deleteCustomer, editCustomer, verifyCustomerRedux } from "../reducer/customerReducer"
import { enqueueSnackbar } from "notistack"

export const startLoadCustomers = () => {
    return async (dispatch) => {
        try {
            const { data } = await instanceApi.get('/customer')
            dispatch(loadCustomers(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOneCustomer = (customer_id) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/customer/${customer_id}`)
            dispatch(loadCustomer(data.data));
        } catch (error) {
            console.log(error);
        }
    }

export const deleteOneCustomer = (customer_id) =>
    async dispatch => {
        try {
            await instanceApi.delete(`/customer/${customer_id}`)
            dispatch(deleteCustomer(customer_id));
        } catch (error) {
            console.log(error);
        }
    }

export const verifyOneCustomer = (customer_id) =>{
   
   return async (dispatch) => {
        try {
          const{data} = await instanceApi.post(`/customer/validate/${customer_id}`)
          console.log(data);
           dispatch(verifyCustomerRedux(customer_id))
        } catch (error) {
            console.log(error);
        }
}
}

export const editOneCustomer = (customer_id, values) => {
    return async (dispatch) => {
        try {
          const formData = new FormData();
          formData.append('fullname', values.fullname );
          formData.append('type_customer',values.type_customer);
          formData.append("profile_image", values.profile_image)
        const { data } = await instanceApi.post(
            `/customer/update/${customer_id}`,formData, {
              headers: {
                token: Cookies.get("session"),
                "Content-Type": "multipart/form-data",
              }
            }
        );
        dispatch(editCustomer(customer_id, data.data));
        enqueueSnackbar('Usuario actualizada con exito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
        } catch (error) {
          console.log(error);
          enqueueSnackbar(`Ocurrió un error al actualizar la el servicio : ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
    };

};
    


    