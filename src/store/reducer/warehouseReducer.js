import { createSlice } from "@reduxjs/toolkit";

export const warehouseReducer = createSlice({
  name: "warehouse",
  initialState: {
    zones: {
      allZones: [],
      loader: false,
      errorMessage: "",
    },
    aisles: {
      allAisles: [],
      loader: false,
      errorMessage: "",
    },
    sections: {
      allSections: [],
      section:{},
      loader: false,
      errorMessage: "",
    },
  },
  reducers: {
    onLoadSection :(state, {payload})=>{
      state.sections.section = payload;
    },
    onStartLoadingZones: (state) => {
      state.zones.loader = true;
    },
    onStartLoadingAisles: (state) => {
      state.aisles.loader = true;
    },
    onStartLoadingSections: (state) => {
      state.sections.loader = true;
    },
    onErrorZones: (state, { payload }) => {
      state.zones.loader = false;
      state.zones.errorMessage = payload;
    },
    onErrorAisles: (state, { payload }) => {
      state.aisles.loader = false;
      state.aisles.errorMessage = payload;
    },
    onErrorSections: (state, { payload }) => {
      state.sections.loader = false;
      state.sections.errorMessage = payload;
    },
    onClearErrors: (state) => {
      state.zones.errorMessage = "";
    },
    onClearErrorsAisles: (state) => {
      state.aisles.errorMessage = "";
    },
    onClearErrorsSections: (state) => {
      state.sections.errorMessage = "";
    },
    onAddZone: (state, { payload }) => {
      state.zones.allZones.unshift(payload);
      state.zones.loader = false;
    },
    onAddAisle: (state, { payload }) => {
      const Zone = state.zones.allZones.find((i) => i._id === payload.zone);
      state.aisles.allAisles.unshift({ ...payload, zone: Zone });
      state.aisles.loader = false;
    },
    onAddSection: (state, { payload }) => {
      const Aisle = state.aisles.allAisles.find((i) => i._id === payload.aisle);
      state.sections.allSections.unshift({ ...payload, aisle: Aisle });
      state.sections.loader = false;
    },
    onUpdateZone: (state, { payload }) => {
      state.zones.allZones = state.zones.allZones.map((i) =>
        i._id === payload._id ? payload : i
      );
      state.zones.loader = false;
    },
    onUpdateAisle: (state, { payload }) => {
      const infoZone = (id) => state.zones.allZones.find((i) => i._id === id);
      state.aisles.allAisles = state.aisles.allAisles.map((i) =>
        i._id === payload._id ? { ...payload, zone: infoZone(payload.zone) } : i
      );
      state.aisles.loader = false;
    },
    onUpdateSection: (state, { payload }) => {
      const infoAisle = (id) =>
        state.aisles.allAisles.find((i) => i._id === id);
      state.sections.allSections = state.sections.allSections.map((i) =>
        i._id === payload._id
          ? { ...payload, aisle: infoAisle(payload.aisle) }
          : i
      );
      state.sections.loader = false;
    },
    onLoadZones: (state, action) => {
      state.zones.allZones = action.payload;
      state.zones.loader = false;
    },
    onLoadAisles: (state, action) => {
      state.aisles.allAisles = action.payload;
      state.aisles.loader = false;
    },
    onLoadSections: (state, action) => {
      state.sections.allSections = action.payload;
      state.sections.loader = false;
    },
    onStopLoaderSection: (state) => {
      state.sections.loader = false;
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
    onDeleteSection: (state, { payload }) => {
      state.sections.allSections = state.sections.allSections.filter(
        (i) => i._id !== payload._id
      );
    },
  },
});

export const {
  onLoadSection,
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
  onAddAisle,
  onAddSection,
  onClearErrorsSections,
  onDeleteSection,
  onErrorSections,
  onLoadSections,
  onStartLoadingSections,
  onUpdateSection,
  onStopLoaderSection
} = warehouseReducer.actions;

export default warehouseReducer.reducer;
