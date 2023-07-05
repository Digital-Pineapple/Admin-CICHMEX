import { createSlice } from '@reduxjs/toolkit'

export const typeCarReducer = createSlice({
  name: 'typeCars',
  initialState: {
    typeCars: [],
    typeCar: {}
  },
  reducers: {
    loadTypeCars: (state, action) => {
      state.typeCars = action.payload;
    },
    loadTypeCar: (state, { type, payload }) => {
      state.typeCar = payload;
    },
    onAddNewTypeCar: (state, { payload }) => {
      state.typeCar = payload;
    },
    deleteTypeCar: (state, { type, payload }) => {
      state.typeCars = state.typeCar.filter(typeCar => typeCar._id !== payload);
    },
    editTypeCar: ( state, { payload } ) => {
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
    }}})

export const { loadTypeCars, loadTypeCar, onAddNewTypeCar, deleteTypeCar, editTypeCar } = typeCarReducer.actions;

export default typeCarReducer.reducer;