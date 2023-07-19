import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { loadService, loadServices, deleteService, editService, onAddNewService } from "../reducer/servicesReducer"
import Cookies from "js-cookie"

export const startLoadServices = () => {
    return async dispatch => {
        try {
            const { data } = await instanceApi.get('/services')
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
        } catch (error) {
            console.log(error);
        }
    }

    export const editOneService = (service_id, values) => {
      console.log(values);
        return async (dispatch) => {
            try {
              const formData = new FormData();
              formData.append('name', values.name );
              formData.append('description',values.description);
              formData.append('service_image',values.service_image);
              formData.append('status', values.status);
              formData.append('subCategory', values.subCategory)
            const { data } = await instanceApi.put(
                `/services/${service_id}`,formData, {
                  headers: {
                    token: Cookies.get("session"),
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
          const { data } = await instanceApi.post(`/services/`, values);
          dispatch(onAddNewService(data.data));
          enqueueSnackbar('Categoria creada con éxito', {variant:'success', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
      
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
      