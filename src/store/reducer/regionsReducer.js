import { createSlice } from '@reduxjs/toolkit'

export const regionsReducer = createSlice({
    name: 'regions',
    initialState: {
        regions: [],
        region: {},
    },
    reducers: {
      
        loadRegions: (state, { payload }) => {
            state.regions = payload;
        },
        loadRegion: (state, {  payload }) => {
            state.region = payload;
        },
        deleteRegion: (state, { payload }) => {
            state.regions = state.regions.filter(i => i._id !== payload);
        },
        editRegion: ( state, { payload } ) => {
            state.region = payload
          }}})

export const { deleteRegion, editRegion, loadRegion, loadRegions } = regionsReducer.actions;

export default regionsReducer.reducer;