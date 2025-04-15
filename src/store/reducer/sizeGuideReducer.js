import { createSlice } from '@reduxjs/toolkit'

// Reducer para manejar el estado relacionado con las guías de tallas
export const sizeGuideReducer = createSlice({
  name: 'sizeGuide',
  initialState: {
    sizeGuides: [], // Lista de todas las guías de tallas
    sizeGuide: {},  // Guía de talla seleccionada o actual
  },
  reducers: {
    // Cargar todas las guías de tallas en el estado
    loadSizeGuides: (state, action) => {
      state.sizeGuides = action.payload;
    },
    // Cargar una guía de talla específica en el estado
    loadOneSizeGuide: (state, { payload }) => {
      state.sizeGuide = payload;
    },
    // Agregar una nueva guía de talla al estado
    onAddSizeGuide: (state, { payload }) => {
      state.sizeGuide = payload;
    },
    // Eliminar una guía de talla del estado por su ID
    deleteSizeGuide: (state, { payload }) => {
      state.sizeGuides = state.sizeGuides.filter(i => i._id !== payload._id);
    },
    // Editar una guía de talla existente en el estado
    editSizeGuide: (state, { payload }) => {
      state.sizeGuides = state.sizeGuides.map(item => {
        if (item._id === payload._id) {
          return {
            ...item, // Aquí puedes agregar las propiedades actualizadas
          };
        }
        return item; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exportar las acciones para usarlas en otros componentes
export const { loadSizeGuides, loadOneSizeGuide, onAddSizeGuide, deleteSizeGuide, editSizeGuide } = sizeGuideReducer.actions;

// Exportar el reducer para configurarlo en el store
export default sizeGuideReducer.reducer;