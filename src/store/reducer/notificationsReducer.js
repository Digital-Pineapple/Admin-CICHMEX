import { createSlice } from '@reduxjs/toolkit';

export const notificationsReducer = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [], // Lista de notificaciones
    notificationsLoading: false // Estado de carga de notificaciones
  },
  reducers: {
    // Carga una lista de notificaciones en el estado
    loadNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    // Marca una notificación específica como leída
    markNotificationAsRead: (state, { payload }) => {
      state.notifications = state.notifications.map(notification => 
        notification._id === payload ? { ...notification, readed: true } : notification
      );
    },
    // Marca todas las notificaciones como leídas
    markAllNotificationsAsRead: (state) => {
      state.notifications = state.notifications.map(notification => ({
        ...notification,
        readed: true,
      }));
    },
    // Establece el estado de carga de notificaciones
    setNotificationsLoading: (state, { payload })=>{
        state.notificationsLoading = payload;
    },
    // Agrega una nueva notificación al inicio de la lista si no existe ya
    addNotification: (state, { payload }) =>{ 
        if(state.notifications.some(notification => notification._id === payload._id)){
          return;
        }
        state.notifications.unshift(payload);
    }
  },
});

// Exporta las acciones para ser usadas en otros lugares
export const { loadNotifications, setNotificationsLoading, markNotificationAsRead, markAllNotificationsAsRead, addNotification } = notificationsReducer.actions;

// Exporta el reducer para ser usado en la configuración del store
export default notificationsReducer.reducer;
