import { createSlice } from '@reduxjs/toolkit'

export const typeUserReducer = createSlice({
  name: 'typeUsers',
  initialState: {
    typeUsers: [],
    typeUser: {}
  },
  reducers: {
    loadTypeUsers: (state, action) => {
      state.typeUsers = action.payload;
    },
    loadTypeUser: (state, { type, payload }) => {
      state.typeUser = payload;
    },
    onAddNewTypeUser: (state, { payload }) => {
      state.typeUser = payload;
    },
    deleteTypeUser: (state, { type, payload }) => {
      state.typeUsers = state.typeUsers.filter(typeUser => typeUser._id !== payload);
    },
    editTypeUser: ( state, { payload } ) => {
      state.typeUsers = state.typeUsers.map(typeUser => {
        if (typeUser._id === payload._id) {
          return {
            ...typeUser,
            name: payload.name,
            services: payload.services,
            status: payload.status,
          };
        }
        return typeUser; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { deleteTypeUser, editTypeUser, loadTypeUser, loadTypeUsers, onAddNewTypeUser } = typeUserReducer.actions;

export default typeUserReducer.reducer;