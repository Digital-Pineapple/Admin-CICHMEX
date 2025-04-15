import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const productOrdersReducer = createSlice({
  name: "allProductOrders",
  initialState: {
    productOrders: [], // Lista de todas las órdenes de productos
    productOrder: {}, // Detalle de una orden de producto específica
    resumeOrders: [], // Resumen de órdenes
    readyToPoint: [], // Órdenes listas para ser asignadas a un punto
    readyToDelivery: [] // Órdenes listas para ser entregadas
  },
  reducers: {
    // Carga todas las órdenes de productos
    loadProductOrders: (state, { payload }) => {
      state.productOrders = payload;
    },
    // Carga las órdenes listas para ser asignadas a un punto
    loadReadyToPoint: (state, { payload }) => {
      state.readyToPoint = payload;
    },
    // Carga las órdenes listas para ser entregadas
    loadReadyToDelivery: (state, { payload }) => {
      state.readyToDelivery = payload;
    },
    // Carga el detalle de una orden de producto específica
    loadProductOrder: (state, { payload }) => {
      state.productOrder = payload;
    },
    // Actualiza los detalles de suministro de una orden de producto
    onUpdatePOSupply: (state, { payload }) => {
      state.productOrder.supply_detail = payload.supply_detail;
    },
    // Agrega una nueva orden de producto
    onAddNewProductOrder: (state, { payload }) => {
      state.productOrder = payload;
    },
    // Elimina una orden de producto de la lista general
    deleteProductOrder: (state, { payload }) => {
      state.productOrders = state.productOrders.filter((i) => i._id !== payload);
    },
    // Elimina una orden de producto de la lista de órdenes listas para entrega
    deleteProductOrderDelivery: (state, { payload }) => {
      state.productOrder = state.readyToDelivery.filter((i) => i._id !== payload);
    },
    // Carga el resumen de órdenes
    startLoadResume: (state, { payload }) => {
      state.resumeOrders = payload;
    },
    // Limpia el detalle de la orden de producto actual
    cleanProductOrderDetail(state) {
      state.productOrder = {};
    },
    // Actualiza una orden de producto específica en la lista general
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
  onUpdatePOSupply,
  loadReadyToDelivery
} = productOrdersReducer.actions;

export default productOrdersReducer.reducer;
