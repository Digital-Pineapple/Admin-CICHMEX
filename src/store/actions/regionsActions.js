import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { loadRegion, loadRegions, deleteRegion } from "../reducer/regionsReducer";
import { startLoading, stopLoading, } from "../reducer/uiReducer";

// Carga todas las regiones desde el servidor y las almacena en el estado global
export const startLoadAllRegions = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
    const { data } = await instanceApi.get(`/region/`, {
      headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    dispatch(loadRegions(data.data));
    } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
      }
    );
    }
    dispatch(stopLoading());
  };
  };

// Carga una región específica desde el servidor y la almacena en el estado global
export const startLoadOneRegion = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
    const { data } = await instanceApi.get(`/region/${id}`, {
      headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const info = {
      coordinates: [{ path: data.data.path, type: data.data.type }],
      ...data.data
    };
    
    dispatch(loadRegion(info));
    } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
      }
    );
    }
    dispatch(stopLoading());
  };
  };

// Agrega una nueva región al servidor y redirige al usuario a la lista de regiones
export const startAddNewRegion = (values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
    const { data } = await instanceApi.post(`/region/`,{values:values}, {
      headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    enqueueSnackbar(
      `${data.message}`,
      {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      }
      );
    navigate('/region/regiones', {replace:true})
    } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
      }
    );
    }finally{
    dispatch(stopLoading());
    }
  };
  };

// Actualiza una región existente en el servidor y redirige al usuario a la lista de regiones
export const startUpdateRegion = (id,values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
    const { data } = await instanceApi.put(`/region/update/${id}`,{values:values}, {
      headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    enqueueSnackbar(
      `${data.message}`,
      {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      }
      );
    navigate('/region/regiones', {replace:true})
    } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
      }
    );
    }finally{
    dispatch(stopLoading())
    }
  }
  };

// Elimina una región del servidor y actualiza el estado global
export const startDeleteRegion = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
    const { data } = await instanceApi.delete(`/region/${id}`, {
      headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    enqueueSnackbar(
      `${data.message}`,
      {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      }
      );
      dispatch(deleteRegion(data.data))
    navigate('/region/regiones', {replace:true})
    } catch (error) {

    enqueueSnackbar(

      `${error.response.data.message}`,
      {
      anchorOrigin: { horizontal: "center", vertical: "top" },
      variant: "error",
      }
    );
    }finally{

    dispatch(stopLoading());
    }
  };
  };