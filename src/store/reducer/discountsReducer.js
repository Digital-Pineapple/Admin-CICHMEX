    import { createSlice } from '@reduxjs/toolkit'
    
    export const discountsReducer = createSlice({
      name: 'discounts',
      initialState: {
        discounts: [],
        discount: {},
        loadingDiscount: false
      },
      reducers: {
        startLoadingDiscount : (state)=>{
          state.loadingDiscount = true
        },
        stopLoadingDiscount: (state)=>{
          state.loadingDiscount = false
        },
        loadDiscounts: (state, action) => {
          state.discounts = action.payload;
        },
        loadDiscount: (state, {  payload }) => {
          state.discount = payload;
        },
        onAddNewDiscount: (state, { payload }) => {
          state.discounts.push(payload)
        },
        deleteDiscount: (state, { payload }) => {
          state.discounts = state.discounts.filter(i => i._id !== payload);
        },
        editDiscount: (state, { payload }) => {
          state.discounts = state.discounts.map((i) => 
              i._id === payload._id ? { ...i, ...payload } : i
          );
      }
      }})
    
    export const { deleteDiscount, editDiscount, loadDiscount, loadDiscounts, onAddNewDiscount, startLoadingDiscount, stopLoadingDiscount } = discountsReducer.actions;
    
    export default discountsReducer.reducer;