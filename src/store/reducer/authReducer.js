import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name: 'auth',
    initialState: {
        user    : {},
        logged  : false,
    },
    reducers: {
        login: (state,{ type, payload }) => {
            state.user   = payload;
            state.logged = true;
        }
    },
})

export const { login } = userReducer.actions;

export default userReducer.reducer;