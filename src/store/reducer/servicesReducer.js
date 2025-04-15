import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const servicesReducer = createSlice({
  name: "services",
  initialState: {
    services: [], // Lista de servicios
    service: {}, // Servicio individual
  },
  reducers: {
    // Carga una lista de servicios en el estado
    loadServices: (state, { type, payload }) => {
      state.services = payload;
    },
    // Carga un servicio individual en el estado
    loadService: (state, { type, payload }) => {
      state.service = payload;
    },
    // Agrega un nuevo servicio al estado
    onAddNewService: (state, { payload }) => {
      state.category = payload;
    },
    // Elimina un servicio de la lista de servicios por su ID
    deleteService: (state, { type, payload }) => {
      state.services = state.services.filter(
        (service) => service._id !== payload
      );
    },
    // Edita un servicio existente en la lista de servicios
    editService: (state, { payload }) => {
      state.categories = state.services.map((category) => {
        if (category._id === payload._id) {
          return {
            ...category,
            name: payload.name,
            description: payload.description,
            status: payload.status,
            subCategory: payload.subCategory,
          };
        }
        return category; // Mantener los elementos no modificados tal como están
      });
    },
  },
});

export const {
  loadServices,
  loadService,
  deleteService,
  editService,
  onAddNewService,
} = servicesReducer.actions;

export default servicesReducer.reducer;
