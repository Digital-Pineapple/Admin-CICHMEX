import { enqueueSnackbar } from "notistack";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { instanceApi } from "../../apis/configAxios";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";

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
      enqueueSnackbar(`Error + ${data.message}`, {
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




