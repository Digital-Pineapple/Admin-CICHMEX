import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {}
  },
  reducers: {
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
    loadUser: (state, { payload }) => {
      state.user = payload;
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter(user => user._id !== payload);
    },
    verifyUser: (state, { payload }) => {
      state.users = state.payload
    },
    editUser: ( state, { payload } ) => {
      state.users = state.users.map(user => {
        if (user._id === payload._id) {
          return {
            ...user,
            fullname: payload.fullname,
            email: payload.email,
            status: payload.status,
            phone: payload.phone,
          };
        }
        return user
      });
    }
    
  },
})

export const { deleteUser, editUser, loadUser, loadUsers, verifyUser} = userReducer.actions;

export default userReducer.reducer;