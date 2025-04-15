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
    // Inicia el estado de carga (loading)
    startLoading: (state) => {
       state.loading = true;
    },
    // Detiene el estado de carga (loading)
    stopLoading: (state) => {
      state.loading = false;
    },
    // Establece los enlaces (links) en el estado
    setLinks : (state,{payload})=>{
      state.links = payload
    },
    // Carga los colores en el estado
    onLoadColors: (state,{payload})=>{
      state.colors = payload
    },
    // Carga todos los banners en el estado
    onLoadBanners : (state,{payload})=>{
      state.banners = payload
    },
    // Carga un banner específico en el estado
    onLoadOneBanner : (state, {payload})=>{
      state.banner = payload
    },
    // Agrega un nuevo slide (banner) al estado y detiene el estado de carga
    onAddNewSlide( state, { payload}){
      state.banners.push(payload),
      state.loading = false
    },
    // Actualiza un banner activo en el estado
    updateActiveBanner(state, {payload}) {
      state.banners = state.banners.map((banner)=>{
        if (banner._id === payload._id) {
          return  payload
         }
         return banner
      })
    },
    // Elimina un banner del estado
    onDeleteBanner(state, {payload}) {
      state.banners = state.banners.filter( banner => banner._id !== payload._id)
    },
   
  },
})

// Exporta las acciones y el reducer
export const { startLoading, stopLoading, setLinks, colors, onLoadColors, onLoadBanners, onLoadOneBanner, updateActiveBanner, onDeleteBanner, onAddNewSlide } = uiReducer.actions;

export default uiReducer.reducer;