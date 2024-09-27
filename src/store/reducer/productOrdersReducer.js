import { Satellite } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'

export const productOrdersReducer = createSlice({
    name: 'allProductOrders',
    initialState: {
        productOrders: [],
        productOrder: {},
        resumeOrders :[],
        readyToPoint:[]
    },
    reducers: {
      
        loadProductOrders: (state, { payload }) => {
            state.productOrders = payload;
        },
        loadReadyToPoint: (state, { payload }) => {
            state.readyToPoint = payload;
        },
        loadProductOrder: (state, {  payload }) => {
            state.productOrder = payload;
        },
        onAddNewProductOrder: (state, { payload }) => {
            state.productOrder = payload;
        },
        deleteProductOrder: (state, { payload }) => {
            state.productOrder = state.productOrders.filter(i => i._id !== payload);
        },
        startLoadResume: (state, { payload }) => {
          state.resumeOrders =  payload;
      },
        cleanProductOrderDetail(state){
          state.productOrder = {}
        },
        editProductOrder: ( state, { payload } ) => {
            state.productOrder = payload
          }}})

export const { cleanProductOrderDetail, startLoadResume, deleteProductOrder,loadReadyToPoint, editProductOrder, loadProductOrder, loadProductOrders, onAddNewProductOrder, startLoader } = productOrdersReducer.actions;

export default productOrdersReducer.reducer;