import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const productOrdersReducer = createSlice({
  name: "allProductOrders",
  initialState: {
    productOrders: [],
    productOrder: {},
    resumeOrders: [],
    readyToPoint: [],
  },
  reducers: {
    loadProductOrders: (state, { payload }) => {
      state.productOrders = payload;
    },
    loadReadyToPoint: (state, { payload }) => {
      state.readyToPoint = payload;
    },
    loadProductOrder: (state, { payload }) => {
      state.productOrder = payload;
    },
    onUpdatePOSupply: (state, { payload }) => {
      state.productOrder.supply_detail = payload.supply_detail;
    },
    onAddNewProductOrder: (state, { payload }) => {
      state.productOrder = payload;
    },
    deleteProductOrder: (state, { payload }) => {
      state.productOrder = state.productOrders.filter((i) => i._id !== payload);
    },
    startLoadResume: (state, { payload }) => {
      state.resumeOrders = payload;
    },
    cleanProductOrderDetail(state) {
      state.productOrder = {};
    },
    ProductOrder: (state, { payload }) => {
      state.productOrder = payload;
    },
    updateOneProductOrder: (state, { payload }) => {
      state.productOrders = state.productOrders.map((i) => {
        if (i._id === payload._id) {
          return {
            ...payload,
          };
        }
        return i;
      });
    },
  },
});

export const {
  cleanProductOrderDetail,
  startLoadResume,
  deleteProductOrder,
  loadReadyToPoint,
  editProductOrder,
  loadProductOrder,
  loadProductOrders,
  onAddNewProductOrder,
  startLoader,
  updateOneProductOrder,
  onUpdatePOSupply
} = productOrdersReducer.actions;

export default productOrdersReducer.reducer;
