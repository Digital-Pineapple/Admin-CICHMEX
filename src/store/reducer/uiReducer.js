import { createSlice } from '@reduxjs/toolkit'

export const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
       state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    onLoadLinks:  (state, {payload}) => {
      state.links = payload;
    }
  },
})

export const { startLoading, stopLoading, onLoadLinks } = uiReducer.actions;

export default uiReducer.reducer;