import { instanceApi } from "../../apis/configAxios";
import { loadNotifications, markNotificationAsRead, markAllNotificationsAsRead, setNotificationsLoading } from "../reducer/notificationsReducer";
import { enqueueSnackbar } from "notistack";

export const getNotificationsByUserId = () => {
  return async (dispatch) => {
    dispatch(setNotificationsLoading(true));
    try {
      const { data } = await instanceApi.get(`/notification/user`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadNotifications(data.data));
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
        dispatch(setNotificationsLoading(false));
    }
  };
};

export const markNotificationAsReadById = (notificationId) => {
  return async (dispatch) => {
    try {
      await instanceApi.put(`/notification/${notificationId}/markAsRead`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(markNotificationAsRead(notificationId));
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

export const markAllAsReaded = () => {
  return async (dispatch) => {
    try {
      await instanceApi.put(`/notification/markAllAsReaded`, {}, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(markAllNotificationsAsRead());
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
