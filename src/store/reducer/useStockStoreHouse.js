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
    
  },
})

export const { loadEntryReport, loadInputs} = stockStorehouseReducer.actions;

export default stockStorehouseReducer.reducer;