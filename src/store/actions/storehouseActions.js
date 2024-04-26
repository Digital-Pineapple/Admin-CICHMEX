import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
 StoreHouseReducer, deleteStockProduct, editStockProduct, loadAllStock, loadDetailProductStock, onAddStockProduct
} from "../reducer/storeHouseReducer";
import {
  headerConfigApplication,
  headerConfigFormData,
} from "../../apis/headersConfig";

export const startLoadAllStock = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/stock-StoreHouse`,
        headerConfigApplication
      );
      dispatch(loadAllStock(data.data));
    } catch (error) {
      enqueueSnackbar(
        `Error:${error.response.data.message}'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};

export const startCreateStockProduct =
  (values, navigate) => async (dispatch) => {
    try {
     
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse`,
        values, headerConfigApplication);
      dispatch(onAddStockProduct (data.data));
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/storeHouse", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

export const startAddStockProduct =
  (id, values, navigate) => async (dispatch) => {
    try {
     
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/add/${id}`,
        values, headerConfigApplication);
      dispatch(editStockProduct (data.data));
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/storeHouse", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  export const startRemoveStockProduct =
  (id,values, navigate) => async (dispatch) => {
    try {
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/remove/${id}`,
        values,headerConfigFormData);
      dispatch(editStockProduct(data.data));
      enqueueSnackbar("Editado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/storeHouse", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error + ${error.response.data.message}` , {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

export const startReturnStockProduct = (id, values,navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/return/${id}`,values, headerConfigApplication);
      dispatch(editStockProduct(data.data?._id));
      enqueueSnackbar("Producto regresado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/storeHouse", { replace: true });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Ocurrió un error + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
