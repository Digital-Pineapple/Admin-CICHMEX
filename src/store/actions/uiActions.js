import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { loadDynamicRoutes } from "../reducer";

export const startAddRoute = (values,navigate) => {
    
  return async (dispatch) => {
    dispatch(startLoading())
    try {
       const {data} = await instanceApi.post("/dynamic-route",{values: values}, {
        headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate('/principal', {replace:true})
    } catch (error) {
        
      enqueueSnackbar(`${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }finally{
        dispatch(stopLoading())
    }
  };
};

export const loadAllRoutes = () => {
    
  return async (dispatch) => {
    dispatch(startLoading())
    try {
       const {data} = await instanceApi.get("/dynamic-route/all", {
        headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadDynamicRoutes(data.data))
    } catch (error) {
      enqueueSnackbar(`${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }finally{
        dispatch(stopLoading())
    }
  };
};






