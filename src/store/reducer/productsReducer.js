import { createSlice } from "@reduxjs/toolkit";

export const productsReducer = createSlice({
  name: "products",
  initialState: {
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
      state.product = payload;
      state.isLoading = false;
    },
    onStepNewProduct: (state, { payload }) => {
      if (payload) {
        const existingStepIndex = state.dataProduct.findIndex(i => i.step === payload.step);
    
        if (existingStepIndex !== -1) {
          // Si el paso ya existe, actualiza sus valores
          state.dataProduct[existingStepIndex].values = payload.values;
        } else {
          // Si el paso no existe, añade el nuevo payload
          state.dataProduct.push(payload);
        }
      }
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
  onStepNewProduct
} = productsReducer.actions;

export default productsReducer.reducer;
