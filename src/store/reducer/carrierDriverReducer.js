import { createSlice } from "@reduxjs/toolkit";

export const CarrierDriverReducer = createSlice({
  name: "carrierDrivers",
  initialState: {
    CarrierDrivers: [],
    CarrierDriver: {},
    loading: false,
    optimizedRoutes: {}

  },
  reducers: {
  
    loadCarrierDrivers: (state, action) => {
      state.CarrierDrivers = action.payload;
    },
    loadAllOptimizedRoutes:(state,{payload})=>{
      state.optimizedRoutes = payload

    },
    loadCarrierDriver: (state, { payload }) => {
      state.CarrierDriver = payload;
    },
    deleteCarrierDriver: (state, { payload }) => {
      state.CarrierDrivers = state.CarrierDrivers.filter(
        (i) => i._id !== payload._id
      );
    },
    editcarrierDriver: (state, { payload }) => {
      state.CarrierDrivers = state.CarrierDrivers.map((i) => {
        if (i._id === payload._id) {
          return {
            ...i,
            fullname: payload.fullname,
            email: payload.email,
            status: payload.status,
            phone: payload.phone,
          };
        }
        return i;
      });
    },
  },
});

export const {
  deleteCarrierDriver,
  editcarrierDriver,
  loadCarrierDriver,
  loadCarrierDrivers,
  loadAllOptimizedRoutes,
} = CarrierDriverReducer.actions;

export default CarrierDriverReducer.reducer;
