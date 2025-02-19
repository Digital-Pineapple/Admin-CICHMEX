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
    loadAllStoreHouses: (state, { type, payload }) => {
      state.StoreHouses = payload;
    },
    loadOneStoreHouse: (state, { type, payload }) => {
      state.StoreHouseDetail = payload;
    },
    onDeleteStoreHouse: (state, { type, payload }) => {
      state.StoreHouses = state.StoreHouses.filter(
        (SH) => SH._id !== payload._id
      );
    },
    loadAllStock: (state, { type, payload }) => {
      state.AllStock = payload;
    },

    loadDetailProductStock: (state, { type, payload }) => {
      state.OneProductStock = payload;
    },
    onAddStockProduct: (state, { payload }) => {
      state.OneProductStock = payload;
    },
    deleteStockProduct: (state, { type, payload }) => {
      state.AllStock = state.AllStock.filter(
        (product) => product._id !== payload
      );
    },
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
