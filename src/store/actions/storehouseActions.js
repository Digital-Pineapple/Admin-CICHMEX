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
  onDeleteStoreHouse,
} from "../reducer/storeHouseReducer";
import {
  headerConfigApplication,
  headerConfigFormData,
} from "../../apis/headersConfig";
import { deleteProduct } from "../reducer/productsReducer";
import Swal from "sweetalert2";
import { startLoading, stopLoading } from "../reducer/uiReducer";

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

export const startCreateStoreHouse = ( branchData, coords, navigate ) => {    
  const { name, description, phone, state, municipality, direction, neighborhood, zipcode } = branchData;
  const  { lat, lng } = coords;
  return async (dispatch) => {
    dispatch(startLoading())
    try {  
      const formData = new FormData();
      const lgt = lng;      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", JSON.stringify({ state, municipality, lat, lgt, direction, neighborhood, cp: zipcode }));
      formData.append("type", "deliverypoint");      
      formData.append("phone_number", phone);             
      const info = await instanceApi.post("/storehouse", formData, {
        headers: {         
         "Content-Type": "/multipart/form-data",
        }
      });
      enqueueSnackbar(`Registro exitoso: ${info.data?.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate("/CEDIS/todos");
    } catch (error) {
      console.log(error);
      
    }finally{
    dispatch(stopLoading())
    }
  };
};

export const startUpdateStoreHouse = ( id, branchData, coords, navigate ) => {    
  const { name, description, phone, state, municipality, direction, neighborhood, zipcode } = branchData;
  const  { lat, lng } = coords;
  return async (dispatch) => {
    dispatch(startLoading())
    try {  
      const formData = new FormData();
      const lgt = lng;      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", JSON.stringify({ state, municipality, lat, lgt, direction, neighborhood, cp: zipcode }));
      formData.append("type", "deliverypoint");      
      formData.append("phone_number", phone);            
      const {data} = await instanceApi.put(`/storehouse/update/${id}`, formData, {
        headers: {         
         "Content-Type": "/multipart/form-data",
        }
      });
      enqueueSnackbar(`${data?.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate("/CEDIS/todos");
    } catch (error) {
      console.log(error);
      
    }finally{
    dispatch(stopLoading())
    }
  };
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

export const startDeleteStoreHouse = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.delete(
        `/storehouse/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(onDeleteStoreHouse(data.data))
    } catch (error) {
      enqueueSnackbar(`${error.data.message}`, {
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
