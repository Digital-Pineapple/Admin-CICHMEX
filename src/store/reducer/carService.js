import { createSlice } from '@reduxjs/toolkit'

export const servicesCustomerReducer = createSlice({
  name: 'carService',
  initialState: {
    carServices: [],
  },
  reducers: {
    loadCarService: (state, action) => {
      state.carServices = action.payload;
    },
  onAddNewCarService: (state, { payload }) => {
    state.carServices = payload;
},
    deleteCarService: (state, { type, payload }) => {
      state.carServices = state.carServices.filter(carService => carService._id !== payload);
    },
    editCarService: ( state, { payload } ) => {
      state.carServices = state.carServices.map(carService => {
        if (carService._id === payload._id) {
          return {
            ...carService,
            name : payload.name,
          };
        }
        return carService;
        })
    }}})

export const { loadCarService,onAddNewCarService,deleteCarService,editCarService } = carService.actions;

export default carServiceReducer.reducer;