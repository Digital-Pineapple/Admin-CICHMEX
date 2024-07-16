import { createSlice } from '@reduxjs/toolkit'


export const shippingCostReducer = createSlice({
  name: 'shippingCost',
  initialState: {
    shippingCosts: [],
    shippingCost: {}
  },
  reducers: {
    loadShippingCosts: (state, action) => {
      state.shippingCosts = action.payload;
    },
    loadOneShippingCost: (state, { payload }) => {
      state.shippingCost = payload;
    },
    onAddNewShippingCost: (state, { payload }) => {
      state.shippingCost = payload;
    },
    deleteShippingCost: (state, { payload }) => {
      state.shippingCosts = state.shippingCosts.filter(shippingCost => shippingCost._id !== payload._id);
    },
    editShippingCost: ( state, { payload } ) => {
      state.shippingCosts = state.shippingCosts.map(shippingCost => {
        if (shippingCost._id === payload._id) {
          return {
            ...shippingCost,
            name: payload.name,
          };
        }
        return shippingCost; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { deleteShippingCost, editShippingCost, loadOneShippingCost, loadShippingCosts, onAddNewShippingCost } = shippingCostReducer.actions;

export default shippingCostReducer.reducer;