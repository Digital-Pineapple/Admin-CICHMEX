import { createSlice } from '@reduxjs/toolkit'


export const sizeGuideReducer = createSlice({
  name: 'sizeGuide',
  initialState: {
    sizeGuides: [],
    sizeGuide: {},
  },
  reducers: {
    loadSizeGuides: (state, action) => {
      state.sizeGuides = action.payload;
    },
    loadOneSizeGuide: (state, { payload }) => {
      state.sizeGuide = payload;
    },
    onAddSizeGuide: (state, { payload }) => {
      state.sizeGuide = payload;
    },
    deleteSizeGuide: (state, { payload }) => {
      state.sizeGuides = state.sizeGuides.filter(i => i._id !== payload._id);
    },
    editSizeGuide: ( state, { payload } ) => {
      state.sizeGuides = state.sizeGuides.map(item => {
        if (item._id === payload._id) {
          return {
            ...item,
          };
        }
        return item; // Mantener los elementos no modificados tal como están
      });
    }}})

export const { loadSizeGuides,loadOneSizeGuide, onAddSizeGuide, deleteSizeGuide, editSizeGuide  } = sizeGuideReducer.actions;

export default sizeGuideReducer.reducer;