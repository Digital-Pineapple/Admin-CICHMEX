import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadProductOrder,
  loadProductOrders,
  startLoadResume,
  
} from "../reducer/productOrdersReducer";
import {
  headerConfigApplication,
} from "../../apis/headersConfig";
import Swal from "sweetalert2";
import { startLoading, stopLoading } from "../reducer/uiReducer";

export const startLoadProductOrders = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );

      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading())
      
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading())
  };
};

export const startLoadProductOrdersPaid = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(`/product-order/paid`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading())
  };
};

export const startLoadPOPaidAndSupplyToPonit = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/paidAndSupplyToPoint`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
      dispatch(stopLoading())
    }
  };
};

export const startLoadAssignedPO = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/AssignedPO`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );

      dispatch(loadProductOrders(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }
    finally{
      dispatch(stopLoading())
    }
  };
};

export const startLoadPackageSent = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/deliveries`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
      dispatch(stopLoading())
    }
  };
};
export const startLoadPrintOrderPDF = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/pdfOrder/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob', // Asegura que la respuesta sea tratada como un archivo Blob
      });

      // Crear un URL para el Blob
      const pdfUrl = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));

      // Abrir el PDF en una nueva pestaña del navegador
      const pdfWindow = window.open(pdfUrl);

      // Opcional: Si deseas imprimirlo directamente al abrirlo
      pdfWindow.onload = () => {
        pdfWindow.print();
      };

    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message || "Ocurrió un error inesperado";

      enqueueSnackbar(errorMessage, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};


export const startLoadPOPaidAndSupply = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/paidAndSupply`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
      dispatch(stopLoading())
    }
  };
};

export const startLoadAssignRoute = ({ user_id, order_id, guide, shipping_company }, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { data } = await instanceApi.post(
        `/product-order/assignRoute`,
        { user_id, order_id, guide, shipping_company },
        {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });

      navigate("/auth/Ordenes-de-producto", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Hubo un error en la asignación de la ruta";
      
      enqueueSnackbar(errorMessage, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
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
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/${id}`,
        headerConfigApplication
      );
      dispatch(loadProductOrder(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
      dispatch(stopLoading())
    }
  };
};

export const StartLoadResumeSales = () => {
  return async (dispatch) => {
   dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/resume`,{
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }
      );
      dispatch(startLoadResume(data.data), stopLoading());

    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
   
    }
    dispatch(stopLoading())
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

export const startLoadPendingTransfer = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/pending-transfer`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      dispatch(loadProductOrders(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
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