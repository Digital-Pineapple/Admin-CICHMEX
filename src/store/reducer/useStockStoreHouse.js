import { createSlice } from '@reduxjs/toolkit'

export const stockStorehouseReducer = createSlice({
  name: 'stockStorehouse',
  initialState: {
    inputs: [],
    EntryReport: {}
  },
  reducers: {
    // Carga una lista de insumos en el estado
    loadInputs: (state, action) => {
      state.inputs = action.payload;
    },
    // Carga un reporte de entrada en el estado
    loadEntryReport: (state, { payload }) => {
      state.EntryReport = payload;
    },
    // Actualiza un insumo específico dentro del reporte de entrada
    onUpdateInput: (state, { payload }) => {
      if (!state.EntryReport?.inputs) return;
      state.EntryReport.inputs = state.EntryReport.inputs.map((i) =>
        i._id === payload.data._id
          ? { ...i, ...payload.data, location: payload.location }
          : i
      );      
    },
  },
})

// Exporta las acciones para ser utilizadas en otros lugares
export const { loadEntryReport, loadInputs, onUpdateInput } = stockStorehouseReducer.actions;

// Exporta el reducer para ser utilizado en la configuración de la tienda
export default stockStorehouseReducer.reducer;