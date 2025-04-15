import { createSlice } from '@reduxjs/toolkit'

export const membershipReducer = createSlice({
  name: 'memberships',
  initialState: {
    memberships: [], // Lista de membresías
    membership: {}   // Detalle de una membresía específica
  },
  reducers: {
    // Carga todas las membresías en el estado
    loadMemberships: (state, action) => {
      state.memberships = action.payload;
    },
    // Carga una membresía específica en el estado
    loadMembership: (state, { payload }) => {
      state.membership = payload;
    },
    // Agrega una nueva membresía al estado
    onAddNewMembership: (state, { payload }) => {
      state.membership = payload;
    },
    // Elimina una membresía de la lista de membresías por su ID
    deleteMemmbership: (state, { type, payload }) => {
      state.memberships = state.memberships.filter(item => item._id !== payload);
    },
    // Edita una membresía existente en la lista
    editMembership: ( state, { payload } ) => {
      state.memberships = state.memberships.map(item => {
        if (item._id === payload._id) { // Verifica si el ID coincide
          return {
            ...item,
            name: payload.name, // Actualiza el nombre de la membresía
          };
        }
        return item; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exporta las acciones para utilizarlas en otras partes de la aplicación
export const { deleteMemmbership,editMembership,loadMembership,loadMemberships,onAddNewMembership } = membershipReducer.actions;

// Exporta el reducer para configurarlo en el store
export default membershipReducer.reducer;