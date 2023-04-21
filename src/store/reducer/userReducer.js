import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'userReducer',
  initialState: {
    users: [],
    user : {}
  },
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload.users;
    },
    loadUser: (state,{ type, payload }) => {
      state.user = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadUsers,loadUser } = userReducer.actions;

export default userReducer.reducer;