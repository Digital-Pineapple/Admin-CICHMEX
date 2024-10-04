import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  StoreHouseReducer,
  deleteStockProduct,
  editStockProduct,
  loadAllStock,
  loadDetailProductStock,
  onAddStockProduct,
  loadAllStoreHouses,
  loadOneStoreHouse,
} from "../reducer/storeHouseReducer";
import {
  headerConfigApplication,
  headerConfigFormData,
} from "../../apis/headersConfig";
import { deleteProduct } from "../reducer/productsReducer";
import Swal from "sweetalert2";

export const startLoadAllStock = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadAllStock(data.data));
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadStoreHouses = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/storehouse`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadAllStoreHouses(data.data));
    } catch (error) {
      enqueueSnackbar(`Error:${error.response.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadOneStoreHouse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/storehouse/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadOneStoreHouse(data.data));
    } catch (error) {
      console.log();
      enqueueSnackbar(`Error:${error.response.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startCreateOneStoreHouse =
  (values, navigate) => async (dispatch) => {
    try {
      const { data, message } = await instanceApi.post(
        `/storehouse`,
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
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
  (values, navigate) => async (dispatch) => {
    const id = "662fe69b9ba1d8b3cfcd3634";
    try {
      const { data } = await instanceApi.post(
        `/stock-StoreHouse/${id}`,
        values,
        {   headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }}
      );
      Swal.fire({
        icon: "success",
        title: "Agregado con éxito",
        showConfirmButton: false,
        showLoaderOnConfirm:true,
        timer: 1000, // 5000 ms = 5 segundos. Ajusta según sea necesario
      }).then(async(result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // dispatch(editStockProduct(data.data))
          window.location.href = window.location.href;
        }
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

export const startAddStockProduct =
  (id, values, navigate) => async (dispatch) => {
    const id2 = "662fe69b9ba1d8b3cfcd3634";
    try {
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/add/${id}`,
        values,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Agregado con éxito",
        showConfirmButton: false,
        showLoaderOnConfirm:true,
        timer: 1000, // 5000 ms = 5 segundos. Ajusta según sea necesario
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        // startLoadAllStock(id2)
        window.location.href = window.location.href;
        }
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

export const startRemoveStockProduct = (id, values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.patch(
      `/stock-StoreHouse/remove/${id}`,
      values,
      {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
      }
    );
    dispatch(editStockProduct(data.data));
    enqueueSnackbar("Editado con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error + ${error.response.data.message}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

export const startReturnStockProduct = (id, values, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.patch(
        `/stock-StoreHouse/return/${id}`,
        values,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
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

export const startDeleteStoreHouse = (id, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/storehouse/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );

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
  };
};

export const startDeleteStockStoreHouse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/stock-StoreHouse/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );

      enqueueSnackbar("Producto eliminado del almacen", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(deleteStockProduct(id));
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
