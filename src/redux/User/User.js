import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinStart, signInSuccess, signInFailure } = UserSlice.actions;

export default UserSlice.reducer;
