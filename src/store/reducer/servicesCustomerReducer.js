import { createSlice } from '@reduxjs/toolkit'

export const servicesCustomerReducer = createSlice({
  name: 'servicesCustomer',
  initialState: {
    servicesCustomer: [],
    serviceCustomer: {}
  },
  reducers: {
    loadServicesCustomer: (state, action) => {
      state.servicesCustomer = action.payload;
    },
    loadOneServiceCustomer: (state, { type, payload }) => {
      state.serviceCustomer = payload;
  },
  onAddNewServiceCustomer: (state, { payload }) => {
    state.serviceCustomer = payload;
},
    deleteServiceCustomer: (state, { type, payload }) => {
      state.servicesCustomer = state.servicesCustomer.filter(serviceCustomer => serviceCustomer._id !== payload);
    },
    editServiceCustomer: ( state, { payload } ) => {
      state.servicesCustomer = state.servicesCustomer.map(serviceCustomer => {
        if (serviceCustomer._id === payload._id) {
          return {
            ...serviceCustomer,
            name : payload.name,
          };
        }
        return serviceCustomer; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadServicesCustomer, loadOneServiceCustomer, deleteServiceCustomer, editServiceCustomer, onAddNewServiceCustomer } = servicesCustomerReducer.actions;

export default servicesCustomerReducer.reducer;