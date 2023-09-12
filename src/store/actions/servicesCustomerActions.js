import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import {loadOneServiceCustomer, onAddNewServiceCustomer, deleteServiceCustomer, editServiceCustomer} from "../reducer/servicesCustomerReducer"
import Cookies from "js-cookie"
import { object } from "yup"


      export const startLoadCuServ = (id) => {
        return async dispatch => {
            try {
                const { data } = await instanceApi.get(`/service-customer/customer/${id}`)
                dispatch(loadOneServiceCustomer(data.data))
            } catch (error) {
                console.log(error)
            }
        }
    }

    export const addOneCustomerService = (id, values) => async (dispatch) => {
      try {
        const { data } = await instanceApi.post(`/service-customer/edit/${id}`, values);
        dispatch(onAddNewServiceCustomer(data.data));
        enqueueSnackbar('Servicio agregado con éxito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
    
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Ocurrió un error al agregar : ${error.response.data?.message}`,
        {variant:'error', anchorOrigin: {
         vertical: 'top',
         horizontal: 'right'
       }})
      }
    };

    export const deleteServicesOneCustomer = (services_id, values) =>{
    const resp = Object.values(values)
      return async (dispatch) => {
        try{
          const formData = new FormData();
          formData.append("services", JSON.stringify(resp));
          const { data } = await instanceApi.post(
            `/service-customer/edit/${services_id}`,
            formData, {
              headers: {
                token: Cookies.get("session"),
                "Content-Type": "multipart/form-data",
              },
            }
        );
        dispatch(editServiceCustomer(services_id, data.data));
        enqueueSnackbar('Actualizada con exito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
        } catch (error) {
          console.log(error);
          enqueueSnackbar(`Ocurrió un error + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
    }}
  
   