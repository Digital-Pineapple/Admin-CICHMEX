import { createSlice } from '@reduxjs/toolkit'

export const dynamicRoutesReducer = createSlice({
  name: 'dynamicRoutes',
  initialState: {
    dynamicRoutes: [], // Lista de rutas dinámicas
    dynamicRoute: {} // Ruta dinámica individual
  },
  reducers: {
    // Carga todas las rutas dinámicas en el estado
    loadDynamicRoutes: (state, action) => {
      state.dynamicRoutes = action.payload;
    },
    // Carga una sola ruta dinámica en el estado
    loadOneDynamicRoute: (state, { payload }) => {
      state.dynamicRoute = payload;
    },
    // Agrega una nueva ruta dinámica al estado
    onAddDynamicRoute: (state, { payload }) => {
      state.dynamicRoute = payload;
    },
    // Elimina una ruta dinámica del estado usando su _id
    deleteDynamicRoute: (state, { payload }) => {
      state.dynamicRoutes = state.dynamicRoutes.filter(i => i._id !== payload._id);
    },
    // Edita una ruta dinámica existente en el estado
    editDynamicRoute: (state, { payload }) => {
      state.dynamicRoutes = state.dynamicRoutes.map(i => {
        if (i._id === payload._id) {
          return {
            ...i,
          };
        }
        return i; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exportar las acciones para usarlas en otras partes de la aplicación
export const { loadDynamicRoutes, loadOneDynamicRoute, onAddDynamicRoute, deleteDynamicRoute, editDynamicRoute } = dynamicRoutesReducer.actions;

// Exportar el reducer para integrarlo en el store
export default dynamicRoutesReducer.reducer;