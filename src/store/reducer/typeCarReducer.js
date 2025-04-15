import { createSlice } from '@reduxjs/toolkit'

export const typeCarReducer = createSlice({
  name: 'typeCars',
  initialState: {
    typeCars: [],
    typeCar: {}
  },
  reducers: {
    // Carga una lista de tipos de autos en el estado
    loadTypeCars: (state, action) => {
      state.typeCars = action.payload;
    },
    // Carga un tipo de auto específico en el estado
    loadTypeCar: (state, { type, payload }) => {
      state.typeCar = payload;
    },
    // Agrega un nuevo tipo de auto a la lista de tipos de autos
    onAddNewTypeCar: (state, { payload }) => {
      state.typeCars = [...state.typeCars, payload];
    },
    // Elimina un tipo de auto de la lista según su ID
    deleteTypeCar: (state, { type, payload }) => {
      state.typeCars = state.typeCars.filter(typeCar => typeCar._id !== payload);
    },
    // Edita un tipo de auto existente en la lista
    editTypeCar: (state, { payload }) => {
      state.typeCars = state.typeCars.map(typeCar => {
        if (typeCar._id === payload._id) {
          return {
            ...typeCar,
            name: payload.name,
            services: payload.services,
            status: payload.status,
          };
        }
        return typeCar; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exporta las acciones para ser utilizadas en otros lugares de la aplicación
export const { loadTypeCars, loadTypeCar, onAddNewTypeCar, deleteTypeCar, editTypeCar } = typeCarReducer.actions;

// Exporta el reducer para ser utilizado en la configuración del store
export default typeCarReducer.reducer;