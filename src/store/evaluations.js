import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const evaluationSlice = createSlice({
  name: "evaluations",
  initialState: {
    loading: false,
    list: null,
    preview: null,
    lastFetch: null,
    errorMessage: null,
    successMessage: null,
  },
  reducers: {
    evaluationsReceived: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.list = action.payload;
      evaluations.errorMessage = null;
      evaluations.lastFetch = Date.now();
    },
    evaluationsRequested: (evaluations) => {
      evaluations.loading = true;
    },
    evaluationsRequestFailed: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.errorMessage = action.payload;
    },
    evaluationPreviewed: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.preview = action.payload;
    },
  },
});

export const {
  evaluationsRequested,
  evaluationsRequestFailed,
  evaluationsReceived,
  evaluationPreviewed,
} = evaluationSlice.actions;
export default evaluationSlice.reducer;

// selectors
export const getEvaluations = createSelector(
  (state) => state.entities.evaluations,
  (evaluations) => evaluations
);
