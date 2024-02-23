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
