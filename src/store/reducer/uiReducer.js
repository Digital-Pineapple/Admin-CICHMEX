import { createSlice } from '@reduxjs/toolkit'  

export const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    links: [],
    colors: []
  },
  reducers: {
    startLoading: (state) => {
       state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setLinks : (state,{payload})=>{
      state.links = payload
    },
    onLoadColors: (state,{payload})=>{
      state.colors = payload
    }
   
  },
})

export const { startLoading, stopLoading, setLinks, colors, onLoadColors } = uiReducer.actions;

export default uiReducer.reducer;