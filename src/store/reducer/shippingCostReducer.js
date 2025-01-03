import { createSlice } from "@reduxjs/toolkit";

export const shippingCostReducer = createSlice({
  name: "shippingCost",
  initialState: {
    shippingCosts: [],
    shippingCost: {},
  },
  reducers: {
    loadShippingCosts: (state, action) => {
      state.shippingCosts = action.payload;
    },
    loadOneShippingCost: (state, { payload }) => {
      state.shippingCost = payload;
    },
    onAddNewShippingCost: (state, { payload }) => {
      state.shippingCosts = [...state.shippingCosts, payload];
    },
    deleteShippingCost: (state, { payload }) => {
      state.shippingCosts = state.shippingCosts.filter(
        (shippingCost) => shippingCost._id !== payload._id
      );
    },
    editShippingCost: (state, { payload }) => {
      state.shippingCosts = state.shippingCosts.map((i) => {
        if (i._id === payload._id) {
          return {
            ...i, // Copia el objeto original
            ...payload, // Sobrescribe con las propiedades del payload
          };
        }
        return i; // Devuelve el objeto original si no coincide
      });
    },
  },
});

export const {
  deleteShippingCost,
  editShippingCost,
  loadOneShippingCost,
  loadShippingCosts,
  onAddNewShippingCost,
} = shippingCostReducer.actions;

export default shippingCostReducer.reducer;
