import { createSlice } from '@reduxjs/toolkit'  

export const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    links: [],
    colors: [],
    banners:[],
    banner: {},
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
    },
    onLoadBanners : (state,{payload})=>{
      state.banners = payload
    },
    onLoadOneBanner : (state, {payload})=>{
      state.banner = payload
    },
    onAddNewSlide( state, { payload}){
      state.banners.push(payload),
      state.loading = false
    },
    updateActiveBanner(state, {payload}) {
      state.banners = state.banners.map((banner)=>{
        if (banner._id === payload._id) {
          return  payload
         }
         return banner
      })
    },
    onDeleteBanner(state, {payload}) {
      state.banners = state.banners.filter( banner => banner._id !== payload._id)
    },
   
  },
})

export const { startLoading, stopLoading, setLinks, colors, onLoadColors, onLoadBanners, onLoadOneBanner, updateActiveBanner, onDeleteBanner, onAddNewSlide } = uiReducer.actions;

export default uiReducer.reducer;