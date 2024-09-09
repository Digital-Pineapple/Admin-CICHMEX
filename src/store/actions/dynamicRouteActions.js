import { enqueueSnackbar } from "notistack";
import {  startLoading, stopLoading } from "../reducer/uiReducer";
import { instanceApi } from "../../apis/configAxios";
import { loadDynamicRoutes, loadOneDynamicRoute, deleteDynamicRoute, editDynamicRoute } from "../reducer/dynamicRoutes";

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

export const loadOneRoute = (id) => {
  
    return async (dispatch) => {
      dispatch(startLoading())
      try {
         const { data } = await instanceApi.get(`/dynamic-route/${id}`, {
          headers: {
              "Content-type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(loadOneDynamicRoute(data.data))
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

  export const startLoadEditDynamicRoute = (id,values) => {
  
    return async (dispatch) => {
      dispatch(startLoading())
      try {
         const { data } = await instanceApi.put(`/dynamic-route/update/${id}`,{values:values}, {
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
        dispatch(editDynamicRoute(data.data))
      } catch (error) {
        console.log(error);
        
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

  export const deleteRoute = (id) => {
  
    return async (dispatch) => {
      dispatch(startLoading())
      try {
         const { data } = await instanceApi.delete(`/dynamic-route/${id}`, {
          headers: {
              "Content-type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        enqueueSnackbar(`${data?.message}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        dispatch(deleteDynamicRoute(data.data))
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




