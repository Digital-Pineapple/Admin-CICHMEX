import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name: 'userReducer',
    initialState: {
        user: {}
    },
    reducers: {
        login: (state,{ type, payload }) => {
            state.user = payload;
        }
    },
})

export const { login } = userReducer.actions;

export default userReducer.reducer;