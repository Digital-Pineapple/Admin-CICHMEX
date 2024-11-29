import { createSlice } from "@reduxjs/toolkit";

export const productsReducer = createSlice({
  name: "products",
  initialState: {
    newProduct: {},
    products: [],
    stockProducts: [],
    product: {},
    dataProduct:[],
    entries: [],
    outputs: [],
    isLoading: false,
  },
  reducers: {
    loadProducts: (state, { type, payload }) => {
      state.products = payload;
    },
    loadStockProducts: (state, { payload }) => {
      state.stockProducts = payload;
    },
    loadProduct: (state, { type, payload }) => {
      state.product = payload;
      state.isLoading = false;
    },
    loadProductEntries: (state, { payload }) => {
      state.entries = payload;
      state.isLoading = false;
    },
    loadProductOutputs: (state, { payload }) => {
      state.outputs = payload;
      state.isLoading = false;
    },
    onAddNewProduct: (state, { payload }) => {
      state.newProduct = payload;
    },
    onStepNewProduct: (state, { payload }) => {
      state.dataProduct = {...payload}
    },    
    deleteProduct: (state, { type, payload }) => {
      state.products = state.products.filter(
        (product) => product._id !== payload
      );
    },
    cleanProductDetail(state) {
      state.product = {};
    },
    onEditVideoProduct(state, { payload }) {
      state.product.videos = payload;
    },
    onEditThumbnailProduct(state, { payload }) {
      state.product.thumbnail = payload;
    },
    onEditImagesProduct(state, { payload }) {
      state.product.images = payload;
    },
    onEditVideosProduct(state, { payload }) {
      state.product.videos = payload;
    },
    onClearValues(state) {
      state.dataProduct = [];
    },
    editProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
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
    },
    startLoadingUpdate : ( state )=>{
      state.isLoading = true
    },
    stopLoadingUpdate : ( state) =>{
      state.isLoading = false
    }
  },
});

export const {
  deleteProduct,
  editProduct,
  loadProduct,
  onEditVideoProduct,
  onEditThumbnailProduct,
  loadProductOutputs,
  loadStockProducts,
  loadProducts,
  onAddNewProduct,
  cleanProductDetail,
  loadProductEntries,
  onEditImagesProduct,
  onEditVideosProduct,
  startLoadingUpdate,
  stopLoadingUpdate,
  onStepNewProduct,
  onClearValues,
} = productsReducer.actions;

export default productsReducer.reducer;
