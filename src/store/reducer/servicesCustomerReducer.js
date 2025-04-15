import { createSlice } from '@reduxjs/toolkit'

export const servicesCustomerReducer = createSlice({
  name: 'servicesCustomer',
  initialState: {
    servicesCustomer: [], // Lista de servicios de clientes
    serviceCustomer: {}   // Información de un servicio específico
  },
  reducers: {
    // Cargar todos los servicios de clientes en el estado
    loadServicesCustomer: (state, action) => {
      state.servicesCustomer = action.payload;
    },
    // Cargar un servicio específico en el estado
    loadOneServiceCustomer: (state, { type, payload }) => {
      state.serviceCustomer = payload;
    },
    // Agregar un nuevo servicio de cliente al estado
    onAddNewServiceCustomer: (state, { payload }) => {
      state.serviceCustomer = payload;
    },
    // Eliminar un servicio de cliente del estado por su ID
    deleteServiceCustomer: (state, { type, payload }) => {
      state.servicesCustomer = state.servicesCustomer.filter(serviceCustomer => serviceCustomer._id !== payload);
    },
    // Editar un servicio de cliente existente en el estado
    editServiceCustomer: ( state, { payload } ) => {
      state.servicesCustomer = state.servicesCustomer.map(serviceCustomer => {
        if (serviceCustomer._id === payload._id) {
          return {
            ...serviceCustomer,
            name : payload.name, // Actualizar el nombre del servicio
          };
        }
        return serviceCustomer; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exportar las acciones para usarlas en otros lugares de la aplicación
export const { loadServicesCustomer, loadOneServiceCustomer, deleteServiceCustomer, editServiceCustomer, onAddNewServiceCustomer } = servicesCustomerReducer.actions;

// Exportar el reducer para integrarlo en el store
export default servicesCustomerReducer.reducer;