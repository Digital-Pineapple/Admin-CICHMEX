import { createSlice } from "@reduxjs/toolkit";

export const CarrierDriverReducer = createSlice({
  name: "carrierDrivers",
  initialState: {
    CarrierDrivers: [],
    CarrierDriver: {},
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    loadCarrierDrivers: (state, action) => {
      state.CarrierDrivers = action.payload;
    },
    loadCarrierDriver: (state, { payload }) => {
      state.CarrierDriver = payload;
    },
    deleteCarrierDriver: (state, { payload }) => {
      state.CarrierDrivers = state.CarrierDrivers.filter(
        (i) => i._id !== payload
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
  startLoading,stopLoading
} = CarrierDriverReducer.actions;

export default CarrierDriverReducer.reducer;
