import { createSlice } from '@reduxjs/toolkit'

export const categoryReducer = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: {}
  },
  reducers: {
    // Carga una lista de categorías en el estado
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
    // Carga una categoría específica en el estado
    loadCategory: (state, { type, payload }) => {
      state.category = payload;
    },
    // Agrega una nueva categoría a la lista de categorías
    onAddNewCategory: (state, { payload }) => {
       state.categories.push(payload)
    },
    // Limpia la categoría seleccionada, dejándola vacía
    onCleanCategory : (state)=>{
      state.category = {}
    },
    // Elimina una categoría de la lista de categorías por su ID
    deleteCategory: (state, { type, payload }) => {
      state.categories = state.categories.filter(category => category._id !== payload);
    },
    // Edita una categoría existente en la lista de categorías
    editCategory: ( state, { payload } ) => {
      state.categories = state.categories.map(category => {
        if (category._id === payload._id) {
          return {
            ...category,
            name: payload.name,
            category_image: payload.category_image,
          };
        }
        return category; // Mantener los elementos no modificados tal como están
      });
    }}})

// Exporta las acciones para ser utilizadas en otros lugares de la aplicación
export const { loadCategories, loadCategory, deleteCategory, editCategory, onAddNewCategory, onCleanCategory } = categoryReducer.actions;

// Exporta el reducer para ser utilizado en la configuración del store
export default categoryReducer.reducer;