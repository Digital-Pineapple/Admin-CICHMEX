import { createSlice } from '@reduxjs/toolkit'

export const stockStorehouseReducer = createSlice({
  name: 'stockStorehouse',
  initialState: {
    inputs: [],
    EntryReport: {}
  },
  reducers: {
    loadInputs: (state, action) => {
      state.inputs = action.payload;
    },
    loadEntryReport: (state, { payload }) => {
      state.EntryReport = payload;
    },
    onUpdateInput: (state, { payload }) => {
      if (!state.EntryReport?.inputs) return;
      state.EntryReport.inputs = state.EntryReport.inputs.map((i) =>
        i._id === payload._id ? { ...i, ...payload } : i
      );
    },
    
    
  },
})

export const { loadEntryReport, loadInputs, onUpdateInput} = stockStorehouseReducer.actions;

export default stockStorehouseReducer.reducer;