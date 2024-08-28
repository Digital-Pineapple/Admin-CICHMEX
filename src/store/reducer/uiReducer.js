import { createSlice } from '@reduxjs/toolkit'

export const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    links: []
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
    }
   
  },
})

export const { startLoading, stopLoading, setLinks } = uiReducer.actions;

export default uiReducer.reducer;