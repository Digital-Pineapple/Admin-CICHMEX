import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteCommission,
  editCommission,
  loadCommission,
  loadCommissions,
  onAddNewCommission,
} from "../reducer/commissionReducer";

// Carga todas las comisiones desde el servidor y las almacena en el estado global
export const startLoadCommissions = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/commission");
      dispatch(loadCommissions(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las comisiones + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Obtiene una comisión específica por su ID y la almacena en el estado global
export const getOneCommission = (commission_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/commission/${commission_id}`);
    dispatch(loadCommission(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la comision + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

// Agrega una nueva comisión al servidor y la almacena en el estado global
export const addOneCommission = (values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.post(`/commission/`, values);
    dispatch(onAddNewCommission(data.data));
    enqueueSnackbar("Comisión creada con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  } catch (error) {
    enqueueSnackbar(
      `Ocurrió un error al agregar la categoria : ${error.response.data?.message}`,
      {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }
    );
  }
};

// Elimina una comisión específica por su ID del servidor y del estado global
export const deleteOneCommission = (commission_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/commission/${commission_id}`);
    dispatch(deleteCommission(commission_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la comisión + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

// Edita una comisión específica por su ID en el servidor y actualiza el estado global
export const editOneCommission = (commission_id, values) => {
  console.log(values);
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.put(
        `/commission/${commission_id}`,
        values
      );
      dispatch(editCommission(commission_id, data.data));
      enqueueSnackbar("Comisión actualizada con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al actualizar la comisión + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
