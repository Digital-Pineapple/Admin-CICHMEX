import { createSlice } from "@reduxjs/toolkit";

export const productsReducer = createSlice({
  name: "products",
  initialState: {
    newProduct: {},
    products: [],
    stockProducts: [],
    product: {},
    dataProduct: [],
    entries: [],
    outputs: [],
    allMovements: [],
    isLoading: false,
    productsPaginate: {
      products: [],
      totalProducts: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 0
    }
  },
  reducers: {
    // Carga la lista de productos en el estado
    loadProducts: (state, { type, payload }) => {
      state.products = payload;
    },

    // Carga los productos paginados en el estado
    loadProductsPaginate: (state, { type, payload }) => {
      state.productsPaginate = { ...payload };
    },

    // Carga los productos en stock en el estado
    loadStockProducts: (state, { payload }) => {
      state.stockProducts = payload;
    },

    // Carga un producto específico en el estado
    loadProduct: (state, { type, payload }) => {
      state.product = payload;
      state.isLoading = false;
    },

    // Carga las entradas de un producto en el estado
    loadProductEntries: (state, { payload }) => {
      state.entries = payload;
      state.isLoading = false;
    },

    // Carga las salidas de un producto en el estado
    loadProductOutputs: (state, { payload }) => {
      state.outputs = payload;
      state.isLoading = false;
    },

    // Carga todos los movimientos de productos en el estado
    loadAllMovementsProducts: (state, { payload }) => {
      state.allMovements = payload;
      state.isLoading = false;
    },

    // Agrega un nuevo producto al estado
    onAddNewProduct: (state, { payload }) => {
      state.product = payload;
    },

    // Actualiza los datos del nuevo producto en pasos
    onStepNewProduct: (state, { payload }) => {
      state.dataProduct = { ...payload };
    },

    // Actualiza los datos del nuevo producto en pasos (versión actualizada)
    onStepNewProductUpdate: (state, { payload }) => {
      state.product = { ...payload };
    },

    // Elimina un producto de la lista paginada
    deleteProduct: (state, { type, payload }) => {
      state.productsPaginate.products = state.productsPaginate.products.filter(
        (product) => product._id !== payload._id
      );
    },

    // Elimina una variante específica de un producto
    onDeleteVariant: (state, { payload }) => {
      state.product.variants = state.product.variants.filter(
        (variant) => variant._id !== payload._id
      );
    },

    // Limpia los detalles del producto actual
    cleanProductDetail(state) {
      state.product = {};
    },

    // Edita el video de un producto
    onEditVideoProduct(state, { payload }) {
      state.product.videos = payload;
    },

    // Edita la miniatura (thumbnail) de un producto
    onEditThumbnailProduct(state, { payload }) {
      state.product.thumbnail = payload;
    },

    // Edita las imágenes de un producto
    onEditImagesProduct(state, { payload }) {
      state.product.images = payload;
    },

    // Limpia los valores temporales del nuevo producto
    onClearValues(state) {
      state.dataProduct = [];
    },

    // Actualiza las imágenes de un producto
    onUpdateImagesProduct(state, { payload }) {
      state.product.images = payload;
    },

    // Actualiza una variante específica de un producto
    updateVariant(state, { payload }) {
      state.product.variants = state.product.variants.map((variant) => {
        if (variant._id === payload._id) {
          return payload;
        }
        return variant;
      });
    },

    // Actualiza el estado de "es variante principal" de las variantes
    updateIsMainVariant(state, { payload }) {
      state.product.variants = payload;
    },

    // Actualiza las imágenes de varias variantes
    updateVariantsImages(state, { payload }) {
      state.product.variants = state.product.variants.map((variant) => {
        const updatedVariant = payload.find((i) => i._id === variant._id);
        return updatedVariant || variant;
      });
    },

    // Actualiza las imágenes de una variante específica
    updateImageVariant(state, { payload }) {
      state.product.variants = state.product.variants.map((variant) => {
        if (variant._id === payload._id) {
          return {
            ...variant,
            images: payload.images
          };
        }
        return variant;
      });
    },

    // Agrega un nuevo tamaño como variante al producto
    onAddNewSizeVariant(state, { payload }) {
      if (!payload || typeof payload !== 'object') {
        console.error('El payload no tiene la estructura esperada.');
        return;
      }
      if (!Array.isArray(state.product.variants)) {
        state.product.variants = [];
      }
      state.product.variants.push(payload);
    },

    // Edita los datos de un producto
    editProduct: (state, { payload }) => {
      state.product = payload;
    },

    // Inicia el estado de carga
    startLoadingUpdate: (state) => {
      state.isLoading = true;
    },

    // Detiene el estado de carga
    stopLoadingUpdate: (state) => {
      state.isLoading = false;
    },

    // Limpia la lista de productos
    onClearProducts: (state) => {
      state.products = [];
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
  onClearProducts,
  loadAllMovementsProducts
} = productsReducer.actions;

export default productsReducer.reducer;
