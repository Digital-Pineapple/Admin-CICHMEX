import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
 cleanProductOrderDetail, deleteProductOrder, editProductOrder, loadProductOrder, loadProductOrders, onAddNewProductOrder, productOrdersReducer
} from "../reducer/productOrdersReducer";
import {
  headerConfigApplication,
  headerConfigForm,
  headerConfigFormData,
} from "../../apis/headersConfig";

export const startLoadProductOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order`,
        headerConfigApplication
      );  
    
      dispatch(loadProductOrders(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
}

export const LoadOneProductOrder = (id) => {
 
  return async (dispatch) => {
    
      try {
        dispatch(startLoading());
        const { data } = await instanceApi.get(
          `/product-order/${id}`, headerConfigApplication );
        dispatch(loadProductOrder(data.data));
        return data;
      } catch (error) {
        enqueueSnackbar(
          `${error.response.data.message}|| 'Error al consultar información'`,
          {
            anchorOrigin: { horizontal: "center", vertical: "top" },
            variant: "error",
          }
        );
      }
  };
};



export const deleteOneProductOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/product-order/${id}`, headerConfigApplication);
      dispatch(deleteOneProductOrder(data.data?._id));
      enqueueSnackbar("Producto eliminado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
