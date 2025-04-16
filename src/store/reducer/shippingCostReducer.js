import { createSlice } from "@reduxjs/toolkit";

export const shippingCostReducer = createSlice({
  name: "shippingCost",
  initialState: {
    shippingCosts: [], // Lista de costos de envío
    shippingCost: {}, // Un costo de envío individual
  },
  reducers: {
    // Carga una lista de costos de envío en el estado
    loadShippingCosts: (state, action) => {
      state.shippingCosts = action.payload;
    },
    // Carga un costo de envío individual en el estado
    loadOneShippingCost: (state, { payload }) => {
      state.shippingCost = payload;
    },
    // Agrega un nuevo costo de envío a la lista existente
    onAddNewShippingCost: (state, { payload }) => {
      state.shippingCosts = [...state.shippingCosts, payload];
    },
    // Elimina un costo de envío de la lista basado en su ID
    deleteShippingCost: (state, { payload }) => {
      state.shippingCosts = state.shippingCosts.filter(
        (shippingCost) => shippingCost._id !== payload._id
      );
    },
    // Edita un costo de envío existente en la lista basado en su ID
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
