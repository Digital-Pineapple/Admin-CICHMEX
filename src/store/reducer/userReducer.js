import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    users: [], // Lista de usuarios
    user: {}   // Usuario individual
  },
  reducers: {
    // Carga una lista de usuarios en el estado
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
    // Carga un usuario individual en el estado
    loadUser: (state, { payload }) => {
      state.user = payload;
    },
    // Elimina un usuario de la lista de usuarios según su ID
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter(user => user._id !== payload);
    },
    // Actualiza la lista de usuarios con datos verificados
    verifyUser: (state, { payload }) => {
      state.users = state.payload;
    },
    // Edita los datos de un usuario específico en la lista
    editUser: (state, { payload }) => {
      state.users = state.users.map(user => {
        if (user._id === payload._id) {
          return {
            ...user,
            fullname: payload.fullname,
            email: payload.email,
            status: payload.status,
            phone: payload.phone,
          };
        }
        return user;
      });
    }
  },
})

// Exporta las acciones para ser utilizadas en otros lugares de la aplicación
export const { deleteUser, editUser, loadUser, loadUsers, verifyUser } = userReducer.actions;

// Exporta el reducer para integrarlo en el store
export default userReducer.reducer;