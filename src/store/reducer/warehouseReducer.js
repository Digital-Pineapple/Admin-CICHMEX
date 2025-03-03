import { createSlice } from "@reduxjs/toolkit";

export const warehouseReducer = createSlice({
  name: "warehouse",
  initialState: {
    zones: {
      allZones: [],
      loader: false,
      errorMessage: "",
    },
    aisles:{
      allAisles:[],
      loader: false,
      errorMessage:''
    }
  },
  reducers: {
    onStartLoadingZones: (state) => {
      state.zones.loader = true;
    },
    onStartLoadingAisles: (state) => {
      state.aisles.loader = true;
    },
    onErrorZones: (state, { payload }) => {
      state.zones.loader = false;
      state.zones.errorMessage = payload;
    },
    onErrorAisles: (state, { payload }) => {
      state.aisles.loader = false;
      state.aisles.errorMessage = payload;
    },
    onClearErrors: (state) => {
      state.zones.errorMessage = "";
    },
    onClearErrorsAisles: (state) => {
      state.aisles.errorMessage = "";
    },
    onAddZone: (state, { payload }) => {
      state.zones.allZones.unshift(payload);
      state.zones.loader = false;
    },
    onAddAisle: (state, { payload }) => {
      const Zone = state.zones.allZones.find(i => i._id === payload.zone);
      state.aisles.allAisles.unshift({...payload, zone: Zone});
      state.aisles.loader = false;
    },       
    onUpdateZone: (state, { payload }) => {
      state.zones.allZones = state.zones.allZones.map((i) =>
        i._id === payload._id ? payload : i
      );
      state.zones.loader = false;
    },
    onUpdateAisle: (state, { payload }) => {
      const infoZone = (id) =>state.zones.allZones.find(i=> i._id === id)
      state.aisles.allAisles = state.aisles.allAisles.map((i) =>
        i._id === payload._id ? {...payload, zone: infoZone(payload.zone),} : i
      );
      state.aisles.loader = false;
    },
    onLoadZones: (state, action) => {
      state.zones.allZones = action.payload;
      state.zones.loader = false;
    },
    onLoadAisles: (state, action) => {
      state.aisles.allAisles = action.payload;
      state.aisles.loader = false;
    },
    onDeleteZone: (state, { payload }) => {
      state.zones.allZones = state.zones.allZones.filter(
        (i) => i._id !== payload._id
      );
    },
    onDeleteAisle: (state, { payload }) => {
      state.aisles.allAisles = state.aisles.allAisles.filter(
        (i) => i._id !== payload._id
      );
    },
  },
});

export const {
  onLoadZones,
  onStartLoadingZones,
  onClearErrors,
  onErrorZones,
  onAddZone,
  onUpdateZone,
  onDeleteZone,
  onAddAisles, 
  onDeleteAisle, 
  onLoadAisles,
  onStartLoadingAisles,
  onUpdateAisle,
  onClearErrorsAisles,
  onErrorAisles,
  onAddAisle

} = warehouseReducer.actions;

export default warehouseReducer.reducer;
