import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { deleteSizeGuide, editSizeGuide, loadOneSizeGuide, loadSizeGuides, onAddSizeGuide } from "../reducer/sizeGuideReducer";
import { startLoading, stopLoading } from "../reducer/uiReducer";

// Carga todas las guías de tamaños desde el servidor
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

// Carga una guía de tamaño específica por su ID
export const startLoadOneSizeGuide = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(`/size-guide/${id}`, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      
      dispatch(loadOneSizeGuide(data.data));
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

// Agrega una nueva guía de tamaño al servidor
export const startAddOneSizeGuide = (values) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.post(`/size-guide/addOne`,{values:values}, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(onAddSizeGuide(data.data));
      enqueueSnackbar(`${data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'success',
        TransitionComponent:Zoom,
      })
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'error',
        TransitionComponent:Zoom,
      })
    } finally{
        dispatch(stopLoading())
    }
  }
}

// Selecciona una guía de tamaño en el estado de la aplicación
export const startSelectSizeGuide = (values) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      dispatch(loadOneSizeGuide(values));
      enqueueSnackbar(`Selección correcta`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'success',
        TransitionComponent:Zoom,
      })
    } catch (error) {
      enqueueSnackbar(`No se selecciono correctamente`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'error',
        TransitionComponent:Zoom,
      })
    } finally{
        dispatch(stopLoading())
    }
  }
}

// Elimina una guía de tamaño por su ID
export const startDeleteSizeGuide = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.delete(`/size-guide/${id}`, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(deleteSizeGuide(data.data));
      enqueueSnackbar(`${data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'success',
        TransitionComponent:Zoom,
      })
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'error',
        TransitionComponent:Zoom,
      })
    } finally{
        dispatch(stopLoading())
    }
  }
}

// Actualiza una guía de tamaño existente por su ID
export const startUpdateSizeGuide = (id, values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.put(`/size-guide/update/${id}`,{values:values}, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(editSizeGuide(data.data));
      enqueueSnackbar(`${data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'success',
        TransitionComponent:Zoom,
      })
      navigate(`/guia-dimensiones`,{replace:true})
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:3000,
        variant:'error',
        TransitionComponent:Zoom,
      })
    } finally{
        dispatch(stopLoading())
    }
  }
}
