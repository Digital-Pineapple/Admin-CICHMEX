import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
 StoreHouseReducer, deleteStockProduct, editStockProduct, loadAllStock, loadDetailProductStock, onAddStockProduct, loadAllStoreHouses, loadOneStoreHouse,
} from "../reducer/storeHouseReducer";
import {
  headerConfigApplication,
  headerConfigFormData,
} from "../../apis/headersConfig";
import { deleteProduct } from "../reducer/productsReducer";

export const startLoadAllStock = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/${id}`,
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

export const startLoadStoreHouses = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/storehouse`,
        headerConfigApplication
      );
      dispatch(loadAllStoreHouses(data.data));
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

export const startLoadOneStoreHouse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/storehouse/${id}`,
        headerConfigApplication
      );
      dispatch(loadOneStoreHouse(data.data));
    } catch (error) {
      console.log();
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

export const startCreateOneStoreHouse =
  (values, navigate) => async (dispatch) => {
    try {
     
      
      const { data, message } = await instanceApi.post(
        `/storehouse`,
        {values:values}, headerConfigApplication);
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/Almacenes", { replace: true });
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


export const startCreateStockProduct =
  (id,values, navigate) => async (dispatch) => {
    try {
     
      const { data } = await instanceApi.post(
        `/stock-StoreHouse/${id}`,
        values, headerConfigApplication);
      dispatch(deleteProduct(data.data?.product_id));
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
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
  (id,values) => async (dispatch) => {
    try {
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/remove/${id}`,
        values,headerConfigApplication);
      dispatch(editStockProduct(data.data));
      enqueueSnackbar("Editado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      })
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

export const startDeleteStoreHouse = (id,navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/storehouse/${id}`,values, headerConfigApplication);
    
      enqueueSnackbar("Almacen eliminado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/Almacenes", { replace: true });
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
  }
}

export const startDeleteStockStoreHouse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/stock-StoreHouse/${id}`, headerConfigApplication);
    
      enqueueSnackbar("Producto eliminado del almacen" , {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(deleteStockProduct(id))
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
  }
}