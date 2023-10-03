import { createSlice } from '@reduxjs/toolkit'

export const myCarReducer = createSlice({
  name: 'myCars',
  initialState: {
    myCars: [],
    myCar: {}
  },
  reducers: {
    loadMyCars: (state, action) => {
      state.myCars = action.payload;
    },
    loadMyCar: (state, { type, payload }) => {
      state.myCar = payload;
    },
    onAddNewMyCar: (state, { payload }) => {
      state.myCars = [...state.myCars, payload] ;
    },
    deleteMyCar: (state, { type, payload }) => {
      state.myCars = state.myCars.filter(myCar => myCar._id !== payload);
    },
    editMyCar: ( state, { payload } ) => {
      state.myCars = state.myCars.map(myCar => {
        if (myCar._id === payload._id) {
          return {
            ...myCar,
          };
        }
        return myCar; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadMyCars, loadMyCar, onAddNewMyCar, deleteMyCar, editMyCar } = myCarReducer.actions;

export default myCarReducer.reducer;