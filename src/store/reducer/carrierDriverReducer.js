import { createSlice } from "@reduxjs/toolkit";

export const CarrierDriverReducer = createSlice({
  name: "carrierDrivers",
  initialState: {
    CarrierDrivers: [],
    CarrierDriver: {},
    loading: false,
    optimizedRoutes: {},
    inRoute: false
  },
  reducers: {
    // Carga la lista completa de conductores de transportistas
    loadCarrierDrivers: (state, action) => {
      state.CarrierDrivers = action.payload;
    },
    // Carga todas las rutas optimizadas
    loadAllOptimizedRoutes: (state, { payload }) => {
      state.optimizedRoutes = payload;
    },
    // Carga un conductor de transportista específico
    loadCarrierDriver: (state, { payload }) => {
      state.CarrierDriver = payload;
    },
    // Elimina un conductor de transportista de la lista
    deleteCarrierDriver: (state, { payload }) => {
      state.CarrierDrivers = state.CarrierDrivers.filter(
        (i) => i._id !== payload._id
      );
    },
    // Marca el inicio de las rutas
    loadStartRoutes: (state) => {
      state.inRoute = true;
    },
    // Marca el fin de las rutas
    loadStopRoutes: (state) => {
      state.inRoute = false;
    },
    // Edita la información de un conductor de transportista
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
  loadStartRoutes,
  loadStopRoutes
} = CarrierDriverReducer.actions;

export default CarrierDriverReducer.reducer;
