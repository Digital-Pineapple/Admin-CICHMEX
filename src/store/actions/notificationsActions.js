import { instanceApi } from "../../apis/configAxios";
import { loadNotifications, markNotificationAsRead, markAllNotificationsAsRead, setNotificationsLoading } from "../reducer/notificationsReducer";
import { enqueueSnackbar } from "notistack";

// Función para obtener las notificaciones de un usuario por su ID
export const getNotificationsByUserId = () => {
  return async (dispatch) => {
    dispatch(setNotificationsLoading(true)); // Indica que las notificaciones están cargando
    try {
      const { data } = await instanceApi.get(`/notification/user`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadNotifications(data.data)); // Carga las notificaciones en el estado
    } catch (error) {
        console.log(error);        
      enqueueSnackbar(`Error: ${error.response?.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } finally {
        dispatch(setNotificationsLoading(false)); // Finaliza el estado de carga
    }
  };
};

// Función para marcar una notificación como leída por su ID
export const markNotificationAsReadById = (notificationId) => {
  return async (dispatch) => {
    try {
      await instanceApi.put(`/notification/${notificationId}/markAsRead`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(markNotificationAsRead(notificationId)); // Actualiza el estado de la notificación como leída
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response?.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
};

// Función para marcar todas las notificaciones como leídas
export const markAllAsReaded = () => {
  return async (dispatch) => {
    try {
      await instanceApi.put(`/notification/markAllAsReaded`, {}, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(markAllNotificationsAsRead()); // Actualiza el estado de todas las notificaciones como leídas
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response?.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
};
