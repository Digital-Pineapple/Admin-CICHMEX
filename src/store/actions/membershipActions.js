import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { deleteMemmbership, editMembership, loadMembership, loadMemberships, onAddNewMembership } from "../reducer/membershipReducer";
import { headerConfig } from "./headers";
import { replace } from "formik";

const config = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    

// Carga todas las membresías desde el servidor y las almacena en el estado global
export const startLoadMemberships = () => {
    return async dispatch => {
        try {
            const { data } = await instanceApi.get('/memberships', config)
            dispatch(loadMemberships(data.data))
        } catch (error) {
            console.log(error)
        }
    }
}

// Obtiene la información de una membresía específica por su ID y la almacena en el estado global
export const getOneMembership = (_id) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/memberships/info/${_id}`, config)
            dispatch(loadMembership(data.data));
        } catch (error) {
            console.log(error);
        }
    }

// Elimina una membresía específica por su ID y actualiza el estado global
export const deleteOneMembership = (_id) =>
    async dispatch => {
        try {
            await instanceApi.delete(`/memberships/${_id}`, headerConfig)
            dispatch(deleteMemmbership(_id));
            enqueueSnackbar('Se eliminó correctamente', {variant:'success',anchorOrigin:{
              horizontal:'center',vertical:'top'
            }})
        } catch (error) {
            console.log(error);
        }
    }

// Edita una membresía específica por su ID con los valores proporcionados y actualiza el estado global
export const editOneMembership = (_id, values) => {
    return async (dispatch) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name );
          formData.append('description',values.description);
        const { data } = await instanceApi.patch(
            `/memberships/${_id}`,formData, config);
        dispatch(editMembership(_id, data.data));
        enqueueSnackbar('Editado con éxito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
        } catch (error) {
          console.log(error);
          enqueueSnackbar(`Error ${error.response.data.message | ''}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
    };

};

// Agrega una nueva membresía con los valores proporcionados, actualiza el estado global y redirige al usuario
export const addOneMembership = (values, navigate) => async (dispatch) => {
    try {
      const { data } = await instanceApi.post(`/memberships/`, values, headerConfig);
      dispatch(onAddNewMembership(data.data));
      enqueueSnackbar(`${data.message}`, {variant:'success', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }})
      navigate('/auth/Membresias', {replace:true})
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data?.message}`,
      {variant:'error', anchorOrigin: {
       vertical: 'top',
       horizontal: 'right'
     }})
    }
};