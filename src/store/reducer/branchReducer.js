import { createSlice } from '@reduxjs/toolkit'

export const branchReducer = createSlice({
  name: 'branchess',
  initialState: {
    branches: [],
    branch: {}
  },
  reducers: {
    // Carga una lista de sucursales en el estado
    loadBranches: (state, action) => {
      state.branches = action.payload;
    },
    // Carga una sucursal específica en el estado
    loadBranch: (state, { type, payload }) => {
      state.branch = payload;
    },
    // Agrega una nueva sucursal al estado
    onAddNewBranch: (state, { payload }) => {
      state.branch = payload;
    },
    // Elimina una sucursal del estado usando su ID
    deleteBranch: (state, { payload }) => {
      state.branches = state.branches.filter(branch => branch._id !== payload._id);
    },
    // Edita una sucursal existente en el estado
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
    }
  }
})

export const { deleteBranch, editBranch, loadBranch, loadBranches, onAddNewBranch } = branchReducer.actions;

export default branchReducer.reducer;