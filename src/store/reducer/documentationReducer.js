import { createSlice } from '@reduxjs/toolkit'

export const documentationReducer = createSlice({
  name: 'documentations',
  initialState: {
    documentations: [],
    documentation: {}
  },
  reducers: {
    loadDocumentations: (state, action) => {
      state.documentations = action.payload;
    },
    loadDocumentation: (state, {  payload }) => {
      state.documentation = payload;
    },
    onAddNewDocumentation: (state, { payload }) => {
      state.documentation = payload;
    },
    deleteDocumentation: (state, { type, payload }) => {
      state.documentations = state.documentations.filter(documentation => documentation._id !== payload);
    },
    editDocumentation: ( state, { payload } ) => {
      state.documentations = state.documentations.map(documentation => {
        if (documentation._id === payload._id) {
          return {
            ...documentation,
            name : payload.name,
            message: payload.message,
            status : payload.status,
            url : payload.url,
            verify: payload.verify,
            customer_id : payload.customer_id,
          };
        }
        return documentation; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadDocumentations, loadDocumentation, onAddNewDocumentation, deleteDocumentation, editDocumentation } = documentationReducer.actions;

export default documentationReducer.reducer;