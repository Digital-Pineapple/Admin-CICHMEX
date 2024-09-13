import { createSlice } from '@reduxjs/toolkit'

export const paymentsReducer = createSlice({
    name: 'payments',
    initialState: {
        payments: [],
        payment: {},
    },
    reducers: {
      
        loadPaymets: (state, { payload }) => {
            state.payments = payload;
        },
        loadPayment: (state, {  payload }) => {
            state.payment = payload;
        },
        deletePayment: (state, { payload }) => {
            state.payments = state.payments.filter(i => i._id !== payload);
        },
        editPayment: ( state, { payload } ) => {
            state.payment = payload
          }}})

export const { loadPayment,loadPaymets,deletePayment,editPayment } = paymentsReducer.actions;

export default paymentsReducer.reducer;