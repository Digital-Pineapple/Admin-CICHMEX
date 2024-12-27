import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const servicesReducer = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: {},
  },
  reducers: {
    loadServices: (state, { type, payload }) => {
      state.services = payload;
    },
    loadService: (state, { type, payload }) => {
      state.service = payload;
    },
    onAddNewService: (state, { payload }) => {
      state.category = payload;
    },
    deleteService: (state, { type, payload }) => {
      state.services = state.services.filter(
        (service) => service._id !== payload
      );
    },
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
