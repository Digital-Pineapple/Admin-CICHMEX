import { createSlice } from '@reduxjs/toolkit'

export const subCategoryReducer = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    subCategoriesByCategory: [],
    subCategory: {}
  },
  reducers: {
    // Cargar todas las subcategorías en el estado
    loadSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    // Cargar subcategorías filtradas por categoría
    loadSubCategoriesByCategory: (state, action) => {
      state.subCategoriesByCategory = action.payload;
    },
    // Cargar una subcategoría específica
    loadSubCategory: (state, { type, payload }) => {
      state.subCategory = payload;
    },
    // Agregar una nueva subcategoría al estado
    onAddNewSubCategory: (state, { payload }) => {
      state.subCategories.push(payload);
    },
    // Eliminar una subcategoría del estado por su ID
    deleteSubCategory: (state, { type, payload }) => {
      state.subCategories = state.subCategories.filter(subCategory => subCategory._id !== payload);
    },
    // Editar una subcategoría existente en el estado
    editSubCategory: (state, { payload }) => {
      state.subCategories = state.subCategories.map(subCategory =>
        subCategory._id === payload._id
          ? { ...subCategory, ...payload } // Actualizar solo la subcategoría coincidente
          : subCategory // Retornar las demás sin cambios
      );
    } 
  }
})

export const { loadSubCategories, loadSubCategoriesByCategory, loadSubCategory, onAddNewSubCategory, deleteSubCategory, editSubCategory } = subCategoryReducer.actions;

export default subCategoryReducer.reducer;