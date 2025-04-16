import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { deleteShippingCost, editShippingCost, loadOneShippingCost, loadShippingCosts, onAddNewShippingCost } from "../reducer/shippingCostReducer";
import { startLoading, stopLoading } from "../reducer/uiReducer";


// Carga todos los costos de envío desde la API y los almacena en el estado
export const startLoadShippingCosts = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(`/shipping-cost`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadShippingCosts(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 1000,
        variant: 'error',
        TransitionComponent: Zoom,
      })
    } finally {
      dispatch(stopLoading())
    }
  }
}

// Carga un costo de envío específico desde la API según su ID
export const startLoadOneShippingCost = (id, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/shipping-cost/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadOneShippingCost(data.data));
    } catch (error) {
      enqueueSnackbar(`${(error.response.data.message)}`, "error");
    }
  };
};

// Crea un nuevo costo de envío y lo agrega al estado
export const startCreateShippingCost = (values, navigate, handleCloseModal) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.post(`/shipping-cost`, { values: values }, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 3000,
        variant: 'success',
      })
      dispatch(onAddNewShippingCost(data.data))
      handleCloseModal()
    } catch (error) {
      console.log(error, 'error');

      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 3000,
        variant: 'error',

      })

    } finally {
      dispatch(stopLoading())
    }
  };
};

// Actualiza un costo de envío existente según su ID
export const startUpdateShippingCost = (id, values, handleCloseModal) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.put(`/shipping-cost/${id}`,
        { values: values }, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(editShippingCost(data.data));
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 3000,
        variant: 'success',

      })
      handleCloseModal()
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 3000,
        variant: 'error',

      })
    } finally {
      dispatch(stopLoading())
    }
  };
};

// Elimina un costo de envío según su ID
export const startDeleteShippingCost = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.delete(`/shipping-cost/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 3000,
        variant: 'success',

      })
      dispatch(deleteShippingCost(data.data));
    } catch (error) {
      console.log(error);

      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: 1000,
        variant: 'error',

      })
    } finally {
      dispatch(stopLoading())
    }
  };
};
