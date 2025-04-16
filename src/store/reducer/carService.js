import { createSlice } from '@reduxjs/toolkit'

// Reducer para manejar los servicios de autos
export const servicesCustomerReducer = createSlice({
  name: 'carService',
  initialState: {
    carServices: [], // Estado inicial: lista de servicios de autos vacía
  },
  reducers: {
    // Carga una lista de servicios de autos en el estado
    loadCarService: (state, action) => {
      state.carServices = action.payload;
    },
    // Agrega un nuevo servicio de auto al estado
    onAddNewCarService: (state, { payload }) => {
      state.carServices = payload;
    },
    // Elimina un servicio de auto del estado según su ID
    deleteCarService: (state, { type, payload }) => {
      state.carServices = state.carServices.filter(carService => carService._id !== payload);
    },
    // Edita un servicio de auto existente en el estado
    editCarService: ( state, { payload } ) => {
      state.carServices = state.carServices.map(carService => {
        if (carService._id === payload._id) {
          return {
            ...carService,
            name : payload.name, // Actualiza el nombre del servicio
          };
        }
        return carService;
      })
    }
  }
})

// Exporta las acciones para ser utilizadas en otros lugares
export const { loadCarService, onAddNewCarService, deleteCarService, editCarService } = servicesCustomerReducer.actions;

// Exporta el reducer para ser utilizado en la configuración de la tienda
export default servicesCustomerReducer.reducer;