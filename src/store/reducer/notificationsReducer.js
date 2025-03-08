import { createSlice } from '@reduxjs/toolkit';

export const notificationsReducer = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    notificationsLoading: false
  },
  reducers: {
    loadNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    markNotificationAsRead: (state, { payload }) => {
      state.notifications = state.notifications.map(notification => 
        notification._id === payload ? { ...notification, readed: true } : notification
      );
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications = state.notifications.map(notification => ({
        ...notification,
        readed: true,
      }));
    },
    setNotificationsLoading: (state, { payload })=>{
        state.notificationsLoading = payload
    },
    addNotification: (state, { payload }) =>{ 
        if(state.notifications.some(notification => notification._id === payload._id)){
          return;
        }
        state.notifications.unshift(payload)
    }
  },
});

export const { loadNotifications, setNotificationsLoading, markNotificationAsRead, markAllNotificationsAsRead, addNotification } = notificationsReducer.actions;

export default notificationsReducer.reducer;
