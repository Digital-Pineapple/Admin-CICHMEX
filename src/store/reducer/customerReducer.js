import { createSlice } from '@reduxjs/toolkit'

export const customerReducer = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    customer: {}
  },
  reducers: {
    loadCustomers: (state, action) => {
      state.customers = action.payload;
    },
    loadCustomer: (state, { type, payload }) => {
      state.customer = payload;
    },
    deleteCustomer: (state, { type, payload }) => {
      state.customers = state.customers.filter(customer => customer._id !== payload);
    },
    verifyOneCustomer: (state, { type, payload }) => {
      state.customers = state.customers.filter(customer => customer._id !== payload);
    },
    editCustomer: ( state, { payload } ) => {
      state.customers = state.customers.map(customer => {
        if (customer._id === payload._id) {
          return {
            ...customer,
            fullname: payload.fullname,
            email: payload.email,
            status: payload.status,
            phone: payload.phone,
          };
        }
        return customer
      });
    }
    
  },
})

export const { loadCustomers, loadCustomer, deleteCustomer,verifyOneCustomer,editCustomer} = customerReducer.actions;

export default customerReducer.reducer;