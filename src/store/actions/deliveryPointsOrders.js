import { enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import instanceApi from "../../apis/userApi";
import { setOrdersByDeliveryPoint } from "../reducer/deliveryPointsReducer";

// Función para iniciar la verificación de un código QR asociado a un pedido
export const StartLoadVerifyCode = ({ order, user, code }) => {
  return async (dispatch) => {
    try {
      const body = { order_id: order, user_id: user, v_code: code };
      const response = await instanceApi.post(`/product-order/start-verifyQr`, body);      
      const id = response.data.data._id;
      Swal.fire({
        title: `Entrega de pedido${response.data.data.order_id}`,
        text: "Se validó código correctamente",
        showCancelButton: false,
        confirmButtonText: "Terminar entrega",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(doneDelivery(id));
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};

// Función para marcar un pedido como entregado
export const doneDelivery = (order_id, notes = "El pedido fue entregado") => {
  return async (dispatch) => {
    try {
      const body = { _id: order_id, notes: notes };  
      const response = await instanceApi.post(`/product-order/end-shipping`, body);
      Swal.fire({
        title: `Se entregó el pedido con éxito`,
      });
      await dispatch(deleteDeliveredOrder(order_id));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};

// Función para obtener los pedidos pendientes de entrega por sucursal
export const getOrdersByBranch = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/product-order/ordersByBranch/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const filteredOrders = data.data.filter((order) => !order?.deliveryStatus && order?.payment_status == "approved");
      await dispatch(setOrdersByDeliveryPoint(filteredOrders));
    } catch (error) {
      console.error(error);
    }
  };
};
