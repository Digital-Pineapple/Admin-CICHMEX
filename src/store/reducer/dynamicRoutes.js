import { createSlice } from '@reduxjs/toolkit'

export const dynamicRoutesReducer = createSlice({
  name: 'dynamicRoutes',
  initialState: {
    dynamicRoutes: [],
    dynamicRoute: {}
  },
  reducers: {
    loadDynamicRoutes: (state, action) => {
      state.dynamicRoutes = action.payload;
    },
    loadOneDynamicRoute: (state, {  payload }) => {
      state.dynamicRoute = payload;
    },
    onAddDynamicRoute: (state, { payload }) => {
      state.dynamicRoute = payload;
    },
    deleteDynamicRoute: (state, { payload }) => {
      state.dynamicRoutes = state.dynamicRoutes.filter(i => i._id !== payload);
    },
    editDynamicRoute: ( state, { payload } ) => {
      state.dynamicRoutes = state.dynamicRoutes.map(i => {
        if (i._id === payload._id) {
          return {
            ...i,
          };
        }
        return i; // Mantener los elementos no modificados tal como están
      });
    }}})

export const {loadDynamicRoutes, loadOneDynamicRoute, onAddDynamicRoute, deleteDynamicRoute,editDynamicRoute } = dynamicRoutesReducer.actions;

export default dynamicRoutesReducer.reducer;