import { createSlice } from '@reduxjs/toolkit'

export const branchReducer = createSlice({
  name: 'branchess',
  initialState: {
    branches: [],
    branch: {}
  },
  reducers: {
    loadBranches: (state, action) => {
      state.branches = action.payload;
    },
    loadBranch: (state, { type, payload }) => {
      state.branch = payload;
    },
    onAddNewBranch: (state, { payload }) => {
      state.branch = payload;
    },
    deleteBranch: (state, { type, payload }) => {
      state.branches = state.branches.filter(branch => branch._id !== payload);
    },
    editBranch: ( state, { payload } ) => {
      state.branches = state.branches.map(branch => {
        if (branch._id === payload._id) {
          return {
            ...branch,
            name: payload.name,
          };
        }
        return branch; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { deleteBranch,editBranch,loadBranch,loadBranches,onAddNewBranch } = branchReducer.actions;

export default branchReducer.reducer;