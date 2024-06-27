import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

export const productsReducer = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: {},
        isLoading: false,
    },
    reducers: {
        loadProducts: (state, { type, payload }) => {
            state.products = payload;
        },
        loadProduct: (state, { type, payload }) => {
            state.product = payload;
            state.isLoading = false;
        },
        onAddNewProduct: (state, { payload }) => {
            state.product = payload;
            state.isLoading = false;
        },
        deleteProduct: (state, { type, payload }) => {
            state.products = state.products.filter(product => product._id !== payload);
        },
        startLoading(state){
          state.isLoading=true
        },
        stopLoading(state){
          state.isLoading=false
        },
        cleanProductDetail(state){
          state.product = {}
        },
        editProduct: ( state, { payload } ) => {
            state.products = state.products.map(product => {
              if (product._id === payload._id) {
                return {
                  ...product,
                  name: payload.name,
                  description: payload.description,
                  status: payload.status,
                };
              }
              return product; // Mantener los elementos no modificados tal como están
            });
          }}})

export const { deleteProduct,editProduct,loadProduct,loadProducts,onAddNewProduct, startLoading, cleanProductDetail, stopLoading } = productsReducer.actions;

export default productsReducer.reducer;