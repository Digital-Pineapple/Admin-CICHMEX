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
    productsPaginate :{
      products: [],
      totalProducts: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 0
    } 
  },
  reducers: {
    loadProducts: (state, { type, payload }) => {
      state.products = payload;
    },
    loadProductsPaginate: (state, { type, payload }) => {
      state.productsPaginate = {...payload};
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
    },
    onStepNewProduct: (state, { payload }) => {
      state.dataProduct = {...payload}
    },
    onStepNewProductUpdate: (state, { payload }) => {
      state.product = {...payload}
    },    
    deleteProduct: (state, { type, payload }) => {
      state.productsPaginate.products = state.productsPaginate.products.filter(
        (product) => product._id !== payload._id
      );
    },
    onDeleteVariant: (state, { payload }) => {
      state.product.variants = state.product.variants.filter(
        (variant) => variant._id !== payload._id
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
    onUpdateImagesProduct(state,{payload}){
      state.product.images = payload
    },
    updateVariant(state, {payload}) {
      state.product.variants = state.product.variants.map((variant)=>{
        if (variant._id === payload._id) {
         
          return  payload
         }
         return variant
      })
    },

    updateIsMainVariant(state, {payload}) {
      state.product.variants = payload
    },

    updateVariantsImages(state, { payload }) {
      state.product.variants = state.product.variants.map((variant) => {
        const updatedVariant = payload.find((i) => i._id === variant._id);
        return updatedVariant || variant; // Si encuentra un match, reemplaza; de lo contrario, conserva el original
      });
    },

    updateImageVariant(state, { payload }) {
      state.product.variants = state.product.variants.map((variant) => {
        if (variant._id === payload._id) {
          // Actualiza únicamente las imágenes de la variante correspondiente
          return {
            ...variant,
            images: payload.images
          };
        }
        return variant;
      });
    },    
    onAddNewSizeVariant(state, { payload }) {
      // Validar que payload no esté vacío
      if (!payload || typeof payload !== 'object') {
        console.error('El payload no tiene la estructura esperada.');
        return;
      }
    
      // Asegurarse de que variants es un array
      if (!Array.isArray(state.product.variants)) {
        state.product.variants = [];
      }
    
      // Agregar la nueva variante al estado
      state.product.variants.push(payload);
    },
     
    editProduct: (state, { payload }) => {
      state.product = payload
    },
    startLoadingUpdate : ( state )=>{
      state.isLoading = true
    },
    stopLoadingUpdate : ( state) =>{
      state.isLoading = false
    },
    onClearProducts: (state)=>{
      state.products = []
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
  updateVariant,
  onUpdateImagesProduct,
  updateImageVariant,
  updateVariantsImages,
  onStepNewProductUpdate,
  onAddNewSizeVariant,
  updateIsMainVariant,
  loadProductsPaginate,
  onDeleteVariant,
  onClearProducts
} = productsReducer.actions;

export default productsReducer.reducer;
