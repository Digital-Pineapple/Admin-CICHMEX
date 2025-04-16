import { createSlice } from '@reduxjs/toolkit'

export const commissionReducer = createSlice({
  name: 'commissions',
  initialState: {
    commissions: [], // Lista de todas las comisiones
    commission: {}   // Información de una comisión específica
  },
  reducers: {
    // Carga todas las comisiones en el estado
    loadCommissions: (state, action) => {
      state.commissions = action.payload;
    },
    // Carga una comisión específica en el estado
    loadCommission: (state, { type, payload }) => {
      state.commission = payload;
    },
    // Agrega una nueva comisión al estado
    onAddNewCommission: (state, { payload }) => {
      state.commission = payload;
    },
    // Elimina una comisión específica de la lista de comisiones
    deleteCommission: (state, { type, payload }) => {
      state.commissions = state.commissions.filter(commission => commission._id !== payload);
    },
    // Edita una comisión existente en la lista de comisiones
    editCommission: ( state, { payload } ) => {
      state.commissions = state.commissions.map(commission => {
        if (commission._id === payload._id) {
          return {
            ...commission,
            name: payload.name, // Actualiza el nombre
            description: payload.description, // Actualiza la descripción
            status: payload.status, // Actualiza el estado
            discount : payload.discount, // Actualiza el descuento
          };
        }
        return commission; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exporta las acciones para ser utilizadas en otros lugares
export const { loadCommissions, loadCommission, onAddNewCommission, deleteCommission, editCommission } = commissionReducer.actions;

// Exporta el reducer para configurarlo en el store
export default commissionReducer.reducer;