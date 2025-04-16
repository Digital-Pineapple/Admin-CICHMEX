import { createSlice } from '@reduxjs/toolkit'

export const myCarReducer = createSlice({
  name: 'myCars',
  initialState: {
    myCars: [],
    myCar: {}
  },
  reducers: {
    // Carga una lista de autos en el estado
    loadMyCars: (state, action) => {
      state.myCars = action.payload;
    },
    // Carga un auto específico en el estado
    loadMyCar: (state, { type, payload }) => {
      state.myCar = payload;
    },
    // Agrega un nuevo auto a la lista de autos
    onAddNewMyCar: (state, { payload }) => {
      state.myCars = [...state.myCars, payload];
    },
    // Elimina un auto de la lista de autos por su ID
    deleteMyCar: (state, { type, payload }) => {
      state.myCars = state.myCars.filter(myCar => myCar._id !== payload);
    },
    // Edita un auto existente en la lista de autos
    editMyCar: (state, { payload }) => {
      state.myCars = state.myCars.map(myCar => {
        if (myCar._id === payload._id) {
          return {
            ...myCar,
          };
        }
        return myCar; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exporta las acciones para usarlas en otros lugares de la aplicación
export const { loadMyCars, loadMyCar, onAddNewMyCar, deleteMyCar, editMyCar } = myCarReducer.actions;

// Exporta el reducer para integrarlo en el store
export default myCarReducer.reducer;