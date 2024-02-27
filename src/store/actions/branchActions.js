import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadBranch,
    loadBranches,
} from "../reducer/branchReducer";

export const startLoadBranches = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/branch-offices ");
      dispatch(loadBranches(data.data));
    } catch (error) {
      enqueueSnackbar(`Error ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
    }
  };
};

export const startLoadBranch = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/branch-offices/${id}`);
      dispatch(loadBranch(data.data));
    } catch (error) {
      enqueueSnackbar(`Error ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
    }
  };
};

export const startVerifyBranch = (_id, user_id, navigate) => {
  return async (dispatch) => {
      try {
        const formData = new FormData();
        formData.append('user_id', user_id );
      const { data } = await instanceApi.post(
          `/branch-offices/verify/${_id}`,formData, {
            headers: {
              token: localStorage.getItem('token'),
              "Content-Type": "multipart/form-data",
            }
          }
      );
      enqueueSnackbar('Activación exitosa', {variant:'success', anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }})
      navigate('/Sucursales/pending',{replace:true})
      
      } catch (error) {

        enqueueSnackbar(`Error ${error.response.data?.message}`,
         {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }})
      }
  };

};