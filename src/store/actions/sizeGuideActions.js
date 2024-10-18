import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { loadSizeGuides } from "../reducer/sizeGuideReducer";
import { Zoom } from "@mui/material";
import { startLoading, stopLoading } from "../reducer/uiReducer";

export const startLoadSizeGuides = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(`/size-guide`, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(loadSizeGuides(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:500,
        variant:'error',
        TransitionComponent:Zoom,
      })
    } finally{
        dispatch(stopLoading())
    }
  }
}

