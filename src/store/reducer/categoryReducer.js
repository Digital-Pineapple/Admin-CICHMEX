import { createSlice } from '@reduxjs/toolkit'

export const categoryReducer = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: {}
  },
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
    loadCategory: (state, { type, payload }) => {
      state.category = payload;
    },
    deleteCategory: (state, { type, payload }) => {
      state.categories = state.categories.filter(category => category._id !== payload);
    },
    editCategory: ( state, { payload } ) => {
      state.categories = state.categories.map(category => {
        if (category._id === payload._id) {
          // Modificar los campos deseados del elemento
          return {
            ...category,
            name: payload.name,
            description: payload.description,
            status: payload.status,
          };
        }
        return category; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadCategories, loadCategory, deleteCategory, editCategory} = categoryReducer.actions;

export default categoryReducer.reducer;