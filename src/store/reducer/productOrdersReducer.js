import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

export const productOrdersReducer = createSlice({
    name: 'allProductOrders',
    initialState: {
        productOrders: [],
        productOrder: {},
        isLoading: false,
        resumeOrders :[]
    },
    reducers: {
        loadProductOrders: (state, { type, payload }) => {
            state.productOrders = payload;
        },
        loadProductOrder: (state, { type, payload }) => {
            state.productOrder = payload;
            state.isLoading = false;
        },
        onAddNewProductOrder: (state, { payload }) => {
            state.productOrder = payload;
        },
        deleteProductOrder: (state, { type, payload }) => {
            state.productOrder = state.productOrders.filter(i => i._id !== payload);
        },
        startLoading(state){
          state.isLoading=true
        },
        startLoadResume: (state, { payload }) => {
          state.resumeOrders =  payload;
      },
        cleanProductOrderDetail(state){
          state.productOrder = {}
        },
        editProductOrder: ( state, { payload } ) => {
            state.productOrder = state.productOrder.map(i => {
              if (i._id === payload._id) {
                return {
                  ...i,
                  name: payload.name,
                  description: payload.description,
                  status: payload.status,
                };
              }
              return i; // Mantener los elementos no modificados tal como están
            });
          }}})

export const { cleanProductOrderDetail, startLoadResume, deleteProductOrder, editProductOrder, loadProductOrder, loadProductOrders, onAddNewProductOrder } = productOrdersReducer.actions;

export default productOrdersReducer.reducer;