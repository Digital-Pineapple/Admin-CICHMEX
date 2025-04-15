import { createSlice } from '@reduxjs/toolkit'

export const documentationReducer = createSlice({
  name: 'documentations',
  initialState: {
    documentations: [], // Lista de documentaciones
    documentation: {}   // Una documentación específica
  },
  reducers: {
    // Cargar todas las documentaciones en el estado
    loadDocumentations: (state, action) => {
      state.documentations = action.payload;
    },
    // Cargar una documentación específica en el estado
    loadDocumentation: (state, { payload }) => {
      state.documentation = payload;
    },
    // Agregar una nueva documentación al estado
    onAddNewDocumentation: (state, { payload }) => {
      state.documentation = payload;
    },
    // Eliminar una documentación de la lista por su ID
    deleteDocumentation: (state, { type, payload }) => {
      state.documentations = state.documentations.filter(documentation => documentation._id !== payload);
    },
    // Editar una documentación existente en la lista
    editDocumentation: (state, { payload }) => {
      state.documentations = state.documentations.map(documentation => {
        if (documentation._id === payload._id) {
          return {
            ...documentation,
            name: payload.name,       // Actualizar el nombre
            verify: payload.verify,   // Actualizar el estado de verificación
            message: payload.message, // Actualizar el mensaje
          };
        }
        return documentation; // Mantener los elementos no modificados tal como están
      });
    }
  }
})

// Exportar las acciones para usarlas en otros lugares
export const { loadDocumentations, loadDocumentation, onAddNewDocumentation, deleteDocumentation, editDocumentation } = documentationReducer.actions;

// Exportar el reducer para configurarlo en el store
export default documentationReducer.reducer;