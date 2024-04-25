import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

export const productsReducer = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: {},
    },
    reducers: {
        loadProducts: (state, { type, payload }) => {
            state.products = payload;
        },
        loadProduct: (state, { type, payload }) => {
            state.product = payload;
        },
        onAddNewProduct: (state, { payload }) => {
            state.product = payload;
        },
        deleteProduct: (state, { type, payload }) => {
            state.products = state.products.filter(product => product._id !== payload);
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

export const { deleteProduct,editProduct,loadProduct,loadProducts,onAddNewProduct } = productsReducer.actions;

export default productsReducer.reducer;