import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const getUser = (state) => state.user.user;

export default userSlice.reducer;
