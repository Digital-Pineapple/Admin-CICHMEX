import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { loadService, loadServices, deleteService, editService, onAddNewService } from "../reducer/servicesReducer"
import {loadOneServiceCustomer, onAddNewServiceCustomer} from "../reducer/servicesCustomerReducer"
import Cookies from "js-cookie"

const config = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    

export const startLoadServices = () => {
    return async dispatch => {
        try {
            const { data } = await instanceApi.get('/services', config)
            dispatch(loadServices(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOneService = service_id =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/services/${service_id}`)
            dispatch(loadService(data.data));
        } catch (error) {
            console.log(error);
        }
    }

export const deleteOneServices = (service_id) =>
    async dispatch => {
        try {
            await instanceApi.delete(`/services/${service_id}`)
            dispatch(deleteService(service_id));
            enqueueSnackbar('Se eliminó correctamente', {variant:'success',anchorOrigin:{
              horizontal:'center',vertical:'top'
            }})
        } catch (error) {
            console.log(error);
        }
    }

    export const editOneService = (service_id, values) => {
        return async (dispatch) => {
            try {
              const formData = new FormData();
              formData.append('name', values.name );
              formData.append('description',values.description);
              formData.append('service_image',values.service_image);
              formData.append('status', values.status);
              formData.append('subCategory', values.subCategory)
            const { data } = await instanceApi.post(
                `/services/${service_id}`,formData, {
                  headers: {
                    token: localStorage.getItem('token'),
                    "Content-Type": "multipart/form-data",
                  }
                }
            );
            dispatch(editService(service_id, data.data));
            enqueueSnackbar('Categoria actualizada con exito', {variant:'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            }})
            } catch (error) {
              console.log(error);
              enqueueSnackbar(`Ocurrió un error al actualizar la categoria + ${error}`,
               {variant:'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
            }
        };
    
    };
    export const addOneService = (values) => async (dispatch) => {
        try {
          const { data } = await instanceApi.post(`/services/`, values, config);
          dispatch(onAddNewService(data.data));
          enqueueSnackbar('Categoria creada con éxito', {variant:'success', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
          return data.data
      
        } catch (error) {
          console.log(error);
          enqueueSnackbar(`Ocurrió un error al agregar la categoria : ${error.response.data?.message}`,
          {variant:'error', anchorOrigin: {
           vertical: 'top',
           horizontal: 'right'
         }})
        }
      };
      export const searchServices = ({value}) => {
        return async (dispatch) => {
            try {
            const { data } = await instanceApi.get(
                `/services/search/search${value ? `?search=${value}` : `?search=${""}`}`,
            );
            console.log(data);
            dispatch(loadServices( data.data));
            enqueueSnackbar('Buesqueda realizada con exito', {variant:'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            }})
            } catch (error) {
              enqueueSnackbar(`Ocurrió un error al buscar el servicio + ${error}`,
               {variant:'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
            }
        };
      
      };
      export const Services = ({value}) => {
        return async (dispatch) => {
            try {
            const { data } = await instanceApi.get(
                `/services/search/search${value ? `?search=${value}` : `?search=${""}`}`,
            );
            console.log(data);
            dispatch(loadServices( data.data));
            enqueueSnackbar('Buesqueda realizada con exito', {variant:'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            }})
            } catch (error) {
              enqueueSnackbar(`Ocurrió un error al buscar el servicio + ${error}`,
               {variant:'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
            }
        };
      
      };

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

   