import { createSlice } from "@reduxjs/toolkit";

export const warehouseReducer = createSlice({
  name: "warehouse",
  initialState: {
    zones: {
      allZones: [],
      loader: false,
      errorMessage: "",
    },
  },
  reducers: {
    onStartLoadingZones: (state) => {
      state.zones.loader = true;
    },
    onErrorZones: (state, { payload }) => {
      state.zones.loader = false;
      state.zones.errorMessage = payload;
    },
    onClearErrors: (state) => {
      state.zones.errorMessage = "";
    },
    onAddZone: (state, {payload}) => {
      state.zones.allZones.push(payload),
      state.zones.loader = false;
    },
    onLoadZones: (state, action) => {
      state.zones.allZones = action.payload;
      state.zones.loader = false;
    },
  },
});

export const { onLoadZones, onStartLoadingZones, onClearErrors, onErrorZones, onAddZone } =
  warehouseReducer.actions;

export default warehouseReducer.reducer;
