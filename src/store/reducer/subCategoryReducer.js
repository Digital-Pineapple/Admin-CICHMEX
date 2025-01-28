import { createSlice } from '@reduxjs/toolkit'

export const subCategoryReducer = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    subCategoriesByCategory:[],
    subCategory: {}
  },
  reducers: {
    loadSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    loadSubCategoriesByCategory: (state, action) => {
      state.subCategoriesByCategory = action.payload;
    },
    loadSubCategory: (state, { type, payload }) => {
      state.subCategory = payload;
    },
    onAddNewSubCategory: (state, { payload }) => {
      state.subCategories.push(payload);
    },
    deleteSubCategory: (state, { type, payload }) => {
      state.subCategories = state.subCategories.filter(subCategory => subCategory._id !== payload);
    },
    editSubCategory: (state, { payload }) => {
      state.subCategories = state.subCategories.map(subCategory =>
        subCategory._id === payload._id
          ? { ...subCategory, ...payload } // Actualizar solo la subcategoría coincidente
          : subCategory // Retornar las demás sin cambios
      );
    } 
  }})
    

export const { loadSubCategories,loadSubCategoriesByCategory, loadSubCategory, onAddNewSubCategory, deleteSubCategory, editSubCategory } = subCategoryReducer.actions;

export default subCategoryReducer.reducer;