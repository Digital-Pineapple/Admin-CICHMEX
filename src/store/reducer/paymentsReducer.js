import { createSlice } from '@reduxjs/toolkit'

export const paymentsReducer = createSlice({
    name: 'payments',
    initialState: {
        payments: [], // Lista de todos los pagos
        payment: {},  // Información de un pago específico
    },
    reducers: {
        // Carga una lista de pagos en el estado
        loadPaymets: (state, { payload }) => {
            state.payments = payload;
        },
        // Carga la información de un pago específico en el estado
        loadPayment: (state, { payload }) => {
            state.payment = payload;
        },
        // Elimina un pago de la lista de pagos según su ID
        deletePayment: (state, { payload }) => {
            state.payments = state.payments.filter(i => i._id !== payload);
        },
        // Edita la información de un pago específico
        editPayment: (state, { payload }) => {
            state.payment = payload;
        }
    }
})

// Exporta las acciones para que puedan ser utilizadas en otros lugares
export const { loadPayment, loadPaymets, deletePayment, editPayment } = paymentsReducer.actions;

// Exporta el reducer para integrarlo en el store
export default paymentsReducer.reducer;