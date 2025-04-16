import { createSlice } from "@reduxjs/toolkit";

export const StoreHouseReducer = createSlice({
  name: "StoreHouse",
  initialState: {
    StoreHouses: [],
    StoreHouseDetail: {},
    AllStock: [],
    OneProductStock: {},
  },
  reducers: {
    // Carga todas las bodegas en el estado
    loadAllStoreHouses: (state, { type, payload }) => {
      state.StoreHouses = payload;
    },
    // Carga el detalle de una bodega específica
    loadOneStoreHouse: (state, { type, payload }) => {
      state.StoreHouseDetail = payload;
    },
    // Elimina una bodega del estado
    onDeleteStoreHouse: (state, { type, payload }) => {
      state.StoreHouses = state.StoreHouses.filter(
        (SH) => SH._id !== payload._id
      );
    },
    // Carga todo el inventario en el estado
    loadAllStock: (state, { type, payload }) => {
      state.AllStock = payload;
    },
    // Carga el detalle de un producto específico en el inventario
    loadDetailProductStock: (state, { type, payload }) => {
      state.OneProductStock = payload;
    },
    // Agrega un producto al inventario
    onAddStockProduct: (state, { payload }) => {
      state.OneProductStock = payload;
    },
    // Elimina un producto del inventario
    deleteStockProduct: (state, { type, payload }) => {
      state.AllStock = state.AllStock.filter(
        (product) => product._id !== payload
      );
    },
    // Edita un producto existente en el inventario
    editStockProduct: (state, { payload }) => {
      state.AllStock = state.AllStock.map((product) => {
        if (product._id === payload._id) {
          return {
            ...product,
          };
        }
        return product; // Mantener los elementos no modificados tal como están
      });
    },
  },
});

export const {
  deleteStockProduct,
  editStockProduct,
  loadAllStock,
  loadDetailProductStock,
  onAddStockProduct,
  loadAllStoreHouses,
  loadOneStoreHouse,
  onDeleteStoreHouse
} = StoreHouseReducer.actions;

export default StoreHouseReducer.reducer;
