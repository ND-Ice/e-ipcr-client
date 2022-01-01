import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: null,
    currentUser: null,
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
    },
    currentUserReceived: (user, action) => {
      user.currentUser = action.payload;
      user.loading = false;
    },
    userLoggedOut: (user, action) => {
      localStorage.removeItem("persist:root");
      user.currentUser = null;
    },
    userRegistered: (user, action) => {
      user.loading = false;
    },
  },
});

export const {
  userRequested,
  userRequestFailed,
  currentUserReceived,
  userLoggedOut,
  userRegistered,
} = userSlice.actions;
export default userSlice.reducer;

export const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
