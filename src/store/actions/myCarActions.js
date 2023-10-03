import Cookies from "js-cookie"
import { instanceApi } from "../../apis/configAxios"
import { loadMyCars, loadMyCar, onAddNewMyCar, deleteMyCar, editMyCar  } from "../reducer/myCarReducer"
import { enqueueSnackbar } from "notistack"


export const startLoadMyCars = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await instanceApi.get(`/car_detail/customer/${id}`)
            dispatch(loadMyCars(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOneMyCar = (id) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/car_detail/${id}`)
            dispatch(loadMyCar(data.data));
        } catch (error) {
            console.log(error);
        }
    }

export const deleteOneMyCar = (id) =>
    async dispatch => {
        try {
            await instanceApi.delete(`/car_detail/${id}`)
            dispatch(deleteMyCar(id));
        } catch (error) {
            console.log(error);
        }
    }

    export const addOneMyCar = (id,values) => {
        return async (dispatch) => {
          try {
            const formData = new FormData();
            formData.append('customer_id', id );
            formData.append('plate_number',values.plate_number);
            formData.append('carDetail_image',values.carDetail_image);
            formData.append('status', values.status);
          const { data } = await instanceApi.post(
              `/car_detail/`,formData, {
                headers: {
                  token: Cookies.get("session"),
                  "Content-Type": "multipart/form-data",
                }})
                console.log(data.data);
                dispatch(onAddNewMyCar(data.data))
                
                enqueueSnackbar('Se dio de alta con exito', {variant:'success', anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }})
            } catch (error) {
              enqueueSnackbar(`Ocurrió un error al  dar de alta : ${error?.response.data.message}`,
               {variant:'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
            }
        };
    
      };
      



export const editOneMyCar = (id, values) => {
    return async (dispatch) => {
        try {
          const formData = new FormData();
          formData.append('brand', values.brand);
          formData.append('model',values.model);
          formData.append("version", values.version)
          formData.append("plate_number", values.plate_number)
          formData.append("customer_id", values.customer_id)
        const { data } = await instanceApi.post(
            `/car_detail/${id}`,formData, {
              headers: {
                token: Cookies.get("session"),
                "Content-Type": "multipart/form-data",
              }
            }
        );
        dispatch(editMyCar(id, data.data));
        enqueueSnackbar('Actualizado con exito', {variant:'success', anchorOrigin: {
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
    


    