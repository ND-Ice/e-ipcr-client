import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: null,
    errorMessage: null,
    successMessage: null,
    currentUser: null,
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },
    userRequestFailed: (user, action) => {
      user.errorMessage = action.payload;
      user.loading = false;
    },
    userReceived: (user, action) => {
      user.currentUser = action.payload;
      user.loading = false;
    },
    userLoggedOut: (user, action) => {
      user.currentUser = null;
      user.errorMessage = null;
    },
  },
});

export const { userRequested, userRequestFailed, userReceived, userLoggedOut } =
  userSlice.actions;
export default userSlice.reducer;

export const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
