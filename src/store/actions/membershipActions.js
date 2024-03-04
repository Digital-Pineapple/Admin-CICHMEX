import { enqueueSnackbar } from "notistack"
import { instanceApi } from "../../apis/configAxios"
import { deleteMemmbership, editMembership, loadMembership, loadMemberships, onAddNewMembership } from "../reducer/membershipReducer";

const config = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    

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

export const getOneMembership = _id =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/memberships/${id}`, config)
            dispatch(loadMembership(data.data));
        } catch (error) {
            console.log(error);
        }
    }

export const deleteOneMembership = (_id) =>
    async dispatch => {
        try {
            await instanceApi.delete(`/memberships/${_id}`, config)
            dispatch(deleteMemmbership(_id));
            enqueueSnackbar('Se eliminó correctamente', {variant:'success',anchorOrigin:{
              horizontal:'center',vertical:'top'
            }})
        } catch (error) {
            console.log(error);
        }
    }

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
    export const addOneMembership = (values) => async (dispatch) => {
        try {
          const { data } = await instanceApi.post(`/memberships/`, values, config);
          dispatch(onAddNewMembership(data.data));
          enqueueSnackbar('Creado con éxito', {variant:'success', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
          return data.data
      
        } catch (error) {
          console.log(error);
          enqueueSnackbar(`Error${error.response.data?.message|''}`,
          {variant:'error', anchorOrigin: {
           vertical: 'top',
           horizontal: 'right'
         }})
        }
      };
      
    

   