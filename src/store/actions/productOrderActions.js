import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  cleanProductOrderDetail,
  deleteProductOrder,
  editProductOrder,
  loadProductOrder,
  loadProductOrders,
  onAddNewProductOrder,
  productOrdersReducer,
  startLoadResume,
} from "../reducer/productOrdersReducer";
import {
  headerConfigApplication,
  headerConfigForm,
  headerConfigFormData,
} from "../../apis/headersConfig";
import { replace } from "formik";
import Swal from "sweetalert2";

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
};

export const startLoadProductOrdersPaid = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/product-order/paid`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

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
};

export const startLoadPOPaidAndSupplyToPonit = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/paidAndSupplyToPoint`,
        headerConfigApplication
      );
      dispatch(loadProductOrders(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadAssignedPO = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/AssignedPO`,
        headerConfigApplication
      );

      dispatch(loadProductOrders(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadPackageSent = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/deliveries`,
        headerConfigApplication
      );
      dispatch(loadProductOrders(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadPOPaidAndSupply = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/paidAndSupply`,
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
};

export const startLoadAssignRoute = ({ user_id, order_id }, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product-order/assignRoute`,
        { user_id, order_id },
        headerConfigApplication
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate("/auth/Envios/punto-de-entrega", { replace: true });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const startLoadVerifyStartRoute = ({ order_id, user }, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product-order/verifyStartRoute`,
        { id: order_id, user_id: user },
        headerConfigApplication
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate("/auth/cargar-paquetes", { replace: true });
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const LoadOneProductOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/${id}`,
        headerConfigApplication
      );
      dispatch(loadProductOrder(data.data));
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

export const StartLoadResumeSales = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product-order/resume`,
        headerConfigApplication
      );
      dispatch(startLoadResume(data.data));
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
export const StartLoadVerifyQr = ({ order, user, code }) => {

  return async (dispatch) => {
    try {
      const response = await instanceApi.post(
        `/product-order/start-verifyQr`,
        { order_id: order, user_id: user, v_code: code },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const id = response.data.data._id
      Swal.fire({
        title: `Entrega de pedido${response.data.data.order_id}`,
        text: 'Observaciones',
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Agregar nota",
        showLoaderOnConfirm: true,
        preConfirm: async (notes) => {

          try {
            const {data} = await instanceApi.post(
              `/product-order/end-shipping`,
              { _id: id, notes:notes },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          } catch (error) {
            Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.isConfirmed);
          Swal.fire({
            title: `Se entrego el pedido con éxito`,
          });
        }
      });
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }

  };
};

export const StartLoadVerifyToPoint = ({ order, user, code, branch_id } ) => {
   return async (dispatch) => {
     try {
       const response = await instanceApi.post(
         `/product-order/verifyQrToPoint`,
         { order_id: order, user_id: user, v_code: code, branch_id:branch_id },
         {
           headers: {
             "Content-type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       console.log(response);

       const id = response.data.data._id
       Swal.fire({
         title: `Entrega de pedido${response.data.data.order_id}`,
         text: 'Se validó codigo correctamente',
         showCancelButton: false,
         confirmButtonText: "Terminar entrega",
         showLoaderOnConfirm: true,
         allowOutsideClick: () => !Swal.isLoading(),
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire({
             title: `Se entrego el pedido con éxito`,
           });
         }
       });
     } catch (error) {
       enqueueSnackbar(
         `${error.response.data.message}`,
         {
           anchorOrigin: { horizontal: "center", vertical: "top" },
           variant: "error",
         }
       );
     }
   };
 };

export const StartCompleteProductOrder = (id, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product-order/fill-order/${id}`,
        { storeHouse: true },
        headerConfigApplication
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate(`/auth/Ordenes-de-producto`, { replace: true });
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
  };
};

export const deleteOneProductOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/product-order/${id}`,
        headerConfigApplication
      );
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
