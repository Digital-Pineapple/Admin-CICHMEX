import { createSlice } from '@reduxjs/toolkit'

export const membershipReducer = createSlice({
  name: 'memberships',
  initialState: {
    memberships: [],
    membership: {}
  },
  reducers: {
    loadMemberships: (state, action) => {
      state.memberships = action.payload;
    },
    loadMembership: (state, { payload }) => {
      state.membership = payload;
    },
    onAddNewMembership: (state, { payload }) => {
      state.membership = payload;
    },
    deleteMemmbership: (state, { type, payload }) => {
      state.memberships = state.memberships.filter(item => item._id !== payload);
    },
    editMembership: ( state, { payload } ) => {
      state.memberships = state.memberships.map(item => {
        if (typeCar._id === payload._id) {
          return {
            ...item,
            name: payload.name,
          };
        }
        return item; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { deleteMemmbership,editMembership,loadMembership,loadMemberships,onAddNewMembership } = membershipReducer.actions;

export default membershipReducer.reducer;