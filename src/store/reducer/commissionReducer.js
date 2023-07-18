import { createSlice } from '@reduxjs/toolkit'

export const commissionReducer = createSlice({
  name: 'commissions',
  initialState: {
    commissions: [],
    commission: {}
  },
  reducers: {
    loadCommissions: (state, action) => {
      state.commissions = action.payload;
    },
    loadCommission: (state, { type, payload }) => {
      state.commission = payload;
    },
    onAddNewCommission: (state, { payload }) => {
      state.commission = payload;
    },
    deleteCommission: (state, { type, payload }) => {
      state.commissions = state.commissions.filter(commission => commission._id !== payload);
    },
    editCommission: ( state, { payload } ) => {
      state.commissions = state.commissions.map(commission => {
        if (commission._id === payload._id) {
          return {
            ...commission,
            name: payload.name,
            description: payload.description,
            status: payload.status,
          };
        }
        return commission; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadCommissions, loadCommission, onAddNewCommission, deleteCommission, editCommission } = commissionReducer.actions;

export default commissionReducer.reducer;