    import { createSlice } from '@reduxjs/toolkit'

    export const discountsReducer = createSlice({
      name: 'discounts',
      initialState: {
        discounts: [], // Lista de descuentos
        discount: {}, // Descuento seleccionado
        loadingDiscount: false // Indicador de carga
      },
      reducers: {
        // Marca el estado como cargando descuentos
        startLoadingDiscount: (state) => {
          state.loadingDiscount = true
        },
        // Marca el estado como no cargando descuentos
        stopLoadingDiscount: (state) => {
          state.loadingDiscount = false
        },
        // Carga una lista de descuentos en el estado
        loadDiscounts: (state, action) => {
          state.discounts = action.payload;
        },
        // Carga un descuento específico en el estado
        loadDiscount: (state, { payload }) => {
          state.discount = payload;
        },
        // Agrega un nuevo descuento a la lista de descuentos
        onAddNewDiscount: (state, { payload }) => {
          state.discounts.push(payload)
        },
        // Elimina un descuento de la lista de descuentos por su ID
        deleteDiscount: (state, { payload }) => {
          state.discounts = state.discounts.filter(i => i._id !== payload);
        },
        // Edita un descuento existente en la lista de descuentos
        editDiscount: (state, { payload }) => {
          state.discounts = state.discounts.map((i) => 
              i._id === payload._id ? { ...i, ...payload } : i
          );
        }
      }
    })

    export const { deleteDiscount, editDiscount, loadDiscount, loadDiscounts, onAddNewDiscount, startLoadingDiscount, stopLoadingDiscount } = discountsReducer.actions;

    export default discountsReducer.reducer;