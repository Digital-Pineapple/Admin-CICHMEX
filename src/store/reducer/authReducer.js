import { createSlice } from '@reduxjs/toolkit'
import { fetchRoutes } from '../actions/authActions';

export const userReducer = createSlice({
  name: 'auth',
  initialState: {
    user    : {}, // Estado inicial del usuario (vacío)
    logged  : false, // Indica si el usuario está autenticado
    routes: [], // Rutas disponibles para el usuario
    status: 'idle', // Estado de la solicitud (idle, loading, succeeded, failed)
    error: null, // Mensaje de error en caso de fallo
  },
  reducers: {
    // Acción para iniciar sesión
    onLogin: (state,{payload}) => {
      state.user   = payload; // Se actualiza el usuario con los datos proporcionados
      state.logged = true; // Se marca como autenticado
    },
    // Acción para cerrar sesión
    onLogout: ( state, { payload } ) => {
      state.user   = {}; // Se limpia la información del usuario
      state.errorMessage = payload; // Mensaje de error (si aplica)
      state.logged = false; // Se marca como no autenticado
      state.routes = []; // Se limpian las rutas
    },
  },
  extraReducers: (builder) => {
    builder
      // Caso cuando la solicitud para obtener rutas está en progreso
      .addCase(fetchRoutes.pending, (state) => {
      state.status = 'loading'; // Cambia el estado a "cargando"
      })
      // Caso cuando la solicitud para obtener rutas se completa con éxito
      .addCase(fetchRoutes.fulfilled, (state, action) => {
      state.status = 'succeeded'; // Cambia el estado a "completado"
      state.routes = action.payload; // Actualiza las rutas con los datos obtenidos
      })
      // Caso cuando la solicitud para obtener rutas falla
      .addCase(fetchRoutes.rejected, (state, action) => {
      state.status = 'failed'; // Cambia el estado a "fallido"
      state.error = action.error.message; // Guarda el mensaje de error
      });
    },
})

// Exporta las acciones para iniciar y cerrar sesión
export const { onLogin, onLogout } = userReducer.actions;

// Exporta el reducer por defecto
export default userReducer.reducer;