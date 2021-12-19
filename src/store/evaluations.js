import { createSlice } from "@reduxjs/toolkit";

const evaluationSlice = createSlice({
  name: "evaluations",
  initialState: {
    loading: false,
    list: null,
    lastFetch: null,
  },
  reducers: {
    evaluationsReceived: (evaluations, action) => {
      let { loading, list, lastFetch, errorMessage } = evaluations;
      loading = false;
      list = action.payload;
      errorMessage = null;
      lastFetch = Date.now();
    },
    evaluationsRequested: (evaluations) => {
      let { loading } = evaluations;
      loading = true;
    },
    evaluationsRequestFailed: (evaluations, action) => {
      const { loading, errorMessage } = evaluations;
      loading = false;
      errorMessage = action.payload;
    },
  },
});

export const {
  evaluationsRequested,
  evaluationsRequestFailed,
  evaluationsReceived,
} = evaluationSlice.actions;
export default evaluationSlice.reducer;
