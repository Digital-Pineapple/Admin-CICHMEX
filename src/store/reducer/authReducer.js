import { createSlice } from '@reduxjs/toolkit'
import { fetchRoutes } from '../actions/authActions';

export const userReducer = createSlice({
    name: 'auth',
    initialState: {
        user    : {},
        logged  : false,
        routes: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        onLogin: (state,{payload}) => {
            state.user   = payload;
            state.logged = true;
        },
        onLogout: ( state, { payload } ) => {
            state.user   = {};
            state.errorMessage = payload;
            state.logged = false;
            state.routes = []
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRoutes.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchRoutes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.routes = action.payload;
           
          })
          .addCase(fetchRoutes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
})

export const { onLogin, onLogout } = userReducer.actions;

export default userReducer.reducer;