import { createSlice } from '@reduxjs/toolkit'

// Reducer para gestionar el estado relacionado con los tipos de usuarios
export const typeUserReducer = createSlice({
  name: 'typeUsers',
  initialState: {
    typeUsers: [], // Lista de tipos de usuarios
    typeUser: {}   // Tipo de usuario seleccionado o actual
  },
  reducers: {
    // Cargar una lista completa de tipos de usuarios en el estado
    loadTypeUsers: (state, action) => {
      state.typeUsers = action.payload;
    },
    // Cargar un tipo de usuario específico en el estado
    loadTypeUser: (state, { type, payload }) => {
      state.typeUser = payload;
    },
    // Agregar un nuevo tipo de usuario al estado
    onAddNewTypeUser: (state, { payload }) => {
      state.typeUser = payload;
    },
    // Eliminar un tipo de usuario de la lista según su ID
    deleteTypeUser: (state, { type, payload }) => {
      state.typeUsers = state.typeUsers.filter(typeUser => typeUser._id !== payload);
    },
    // Editar un tipo de usuario existente en la lista
    editTypeUser: ( state, { payload } ) => {
      state.typeUsers = state.typeUsers.map(typeUser => {
        if (typeUser._id === payload._id) {
          return {
            ...typeUser, // Mantener las propiedades existentes
            name: payload.name, // Actualizar el nombre
            services: payload.services, // Actualizar los servicios
            status: payload.status, // Actualizar el estado
          };
        }
        return typeUser; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exportar las acciones para usarlas en otros lugares de la aplicación
export const { deleteTypeUser, editTypeUser, loadTypeUser, loadTypeUsers, onAddNewTypeUser } = typeUserReducer.actions;

// Exportar el reducer para integrarlo en el store
export default typeUserReducer.reducer;