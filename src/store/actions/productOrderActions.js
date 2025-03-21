import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteProductOrder,
  editProductOrder,
  loadProductOrder,
  loadProductOrders,
  loadReadyToDelivery,
  loadReadyToPoint,
  startLoadResume,
  updateOneProductOrder,
  
} from "../reducer/productOrdersReducer";
import { headerConfigApplication } from "../../apis/headersConfig";
import Swal from "sweetalert2";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { green } from "@mui/material/colors";
import { loadAllOptimizedRoutes } from "../reducer";
import { onDeleteOrder, onUpdateOrders } from "../reducer/deliveryPointsReducer";

export const startLoadProductOrders = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(loadProductOrders(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }finally{
      dispatch(stopLoading())
    }
  };
};

export const startLoadProductOrdersPaid = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/paid/all`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading());
  };
};
export const startLoadProductOrdersPaidAndFill = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/paidAndFill/find`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading());
  };
};

export const startLoadPOPaidAndSupplyToPonit = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/paidAndSupplyToPoint`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
      dispatch(stopLoading());
    }
  };
};

export const startLoadAssignedPO = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/AssignedPO/user`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProductOrders(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startLoadPackageSent = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/deliveries`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
      dispatch(stopLoading());
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob", // Asegura que la respuesta sea tratada como un archivo Blob
      });

      // Crear un URL para el Blob
      const pdfUrl = URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );

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
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/paidAndSupply`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProductOrders(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
      dispatch(stopLoading());
    }
  };
};

export const startLoadAssignRoute = (values,handleClose) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData()
      formData.append('user_id', values.user)
      formData.append('order_id', values.order_id)
      formData.append('guide',values.guide)
      formData.append('shipping_company', values.shipping_company)
      formData.append('guide_pdf', values.guide_pdf.file )

      const { data } = await instanceApi.post(
        `/product-order/assignRoute`,
        formData,
        {
          headers: {
            "Content-type": "/multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
        transitionDuration:5000
      });
      console.log(data.data);
      
      
      dispatch(updateOneProductOrder(data.data))
      
      handleClose()
    } catch (error) {
      console.log(error);
      
      const errorMessage =
        error.response?.data?.message ||
        "Hubo un error en la asignación de la ruta";
      enqueueSnackbar(errorMessage, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startLoadVerifyPackage = (
  id,
  navigate
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/verifyPackage/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      
      dispatch(deleteProductOrder(data.data._id))
    } catch (error) {
      const errorMessage =
        error.response?.data?.message 
      enqueueSnackbar(`${errorMessage}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startLoadPOOutOfRegion = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/outOfRegions/get`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadReadyToPoint(data.data))
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message 
      enqueueSnackbar(`${errorMessage}`, {
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
      navigate("/transportista/cargar", { replace: true });
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
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadProductOrder(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
      dispatch(stopLoading());
    }
  };
};

export const startLoadReadyToPoint = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/readyToPoint/ok`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadReadyToPoint(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
      dispatch(stopLoading());
    }
  };
};
export const startLoadReadyToDelivery = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(
        `/product-order/ready_to_delivery`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadReadyToDelivery(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }finally{
      dispatch(stopLoading())
    }
  };
};

export const StartLoadResumeSales = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product-order/resume`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(startLoadResume(data.data), stopLoading());
    } catch (error) {
      console.log(error);
      
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading());
  };
};
export const StartLoadVerifyQr = ({ order, user, code }, callbackClose) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
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
      const id = response.data.data._id;
      
      dispatch(onUpdateOrders(response.data.data))
      callbackClose()
      Swal.fire({
        title: `Entrega de pedido${response.data.data.order_id}`,
        text: "Observaciones",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Agregar nota",
        showLoaderOnConfirm: true,
        preConfirm: async (notes) => {
          try {
            const { data } = await instanceApi.post(
              `/product-order/end-shipping`,
              { _id: id, notes: notes },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(onDeleteOrder(data.data))
          } catch (error) {
            Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
    } catch (error) {
      
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }finally{
      dispatch(stopLoading())
    }
  };
};

export const StartLoadVerifyToPoint = (values, callbackCloseModal) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.put(
        `/product-order/verifyQrToPoint`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `Se recibió paquete: ${data.data.order_id}`,
        text: "Se validó codigo correctamente",
        showCancelButton: false,
        confirmButtonText: "Ok",
      })
      
      dispatch(onUpdateOrders(data.data))
      dispatch(callbackCloseModal())

    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }finally {
      dispatch(stopLoading())
    }
  };
};

export const StartCompleteProductOrder = (id, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product-order/fill-order/${id}`,
        { storeHouse: true },
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
      navigate(`/almacenista/mis-ventas`, { replace: true });
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
      dispatch(deleteProductOrder(data.data?._id));
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
export const startValidateSale = (values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(
        `/payments/validatePaymentProof`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
        confirmButtonColor: green[800],
        timer: 3000,
        timerProgressBar: true,
      });
      dispatch(loadProductOrder(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Ocurrió un error + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};
export const startRejectTicket = (values) => {

  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(
        `/payments/rejectTicket`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
        confirmButtonColor: green[800],
        timer: 3000,
        timerProgressBar: true,
      });
      dispatch(editProductOrder(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Ocurrió un error + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};


export const startLoadPendingTransfer = () => {
  return async (dispatch) => {
    dispatch(startLoading());
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
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startLoadRoutesDelivery = (myCoords) => {
  
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/optimation_to_delivery`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
           params:{
            coords: myCoords
          }
        }
      );
      const {info, waypoints, totalDistance, totalDuration} = data.data
      
      
      const routeData = {
        origin: info.routes[0].legs[0].start_location,
        destination: info.routes[0].legs[0].end_location,
        steps: info.routes[0].legs[0].steps.map((step) => ({
          polyline: step.polyline.points,
          instructions: step.html_instructions,
        })),
        overviewPolyline: info.routes[0].overview_polyline.points,
        waypoints: waypoints,
        totalDistance,
        totalDuration,
        points: info.routes[0].legs

      };
      dispatch(loadAllOptimizedRoutes(routeData))
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      
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


