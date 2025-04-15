import { createSlice } from '@reduxjs/toolkit'

// Este slice maneja el estado relacionado con las regiones
export const regionsReducer = createSlice({
    name: 'regions',
    initialState: {
        regions: [], // Lista de todas las regiones
        region: {},  // Información de una región específica
    },
    reducers: {
        // Carga una lista de regiones en el estado
        loadRegions: (state, { payload }) => {
            state.regions = payload;
        },
        // Carga una región específica en el estado
        loadRegion: (state, { payload }) => {
            state.region = payload;
        },
        // Elimina una región de la lista de regiones usando su ID
        deleteRegion: (state, { payload }) => {
            state.regions = state.regions.filter(i => i._id !== payload);
        },
        // Edita la información de una región específica
        editRegion: (state, { payload }) => {
            state.region = payload;
        }
    }
})

// Exporta las acciones para que puedan ser utilizadas en otros lugares
export const { deleteRegion, editRegion, loadRegion, loadRegions } = regionsReducer.actions;

// Exporta el reducer para integrarlo en el store
export default regionsReducer.reducer;