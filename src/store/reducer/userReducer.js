import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'userReducer',
  initialState: {
    users: []
  },
  reducers: {
      loadUsers: (state,action) => {
        state.users = action.payload.users
      }
  },
})

// Action creators are generated for each case reducer function
export const { loadUsers } = userReducer.actions;

export default userReducer.reducer;