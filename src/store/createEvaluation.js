import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "createEvaluation",
  initialState: {
    currentId: null,
    coreFunctionsMeasure: 90,
    supportFunctionsMeasure: 10,
    coreFunctions: [],
    supportFunctions: [],
    finalAverage: {
      ave: null,
      remarks: null,
      sentiment: null,
    },
    targetIndicator: {
      funcId: null,
      indicatorId: null,
    },
  },
  reducers: {
    setCoreFunctions: (state, action) => {
      state.coreFunctionsMeasure -= action.payload.percentage;
      state.coreFunctions.push(action.payload);
    },

    deleteCoreFunction: (state, action) => {
      const updated = state.coreFunctions.filter(
        (item) => item.id !== action.payload.id
      );
      state.coreFunctionsMeasure += action.payload.coreFunctionsMeasure;
      state.coreFunctions = updated;
    },

    setSupportFunctions: (state, action) => {
      state.supportFunctionsMeasure -= action.payload.percentage;
      state.supportFunctions.push(action.payload);
    },
    deleteSupportFunction: (state, action) => {
      const updated = state.supportFunctions.filter(
        (item) => item.id !== action.payload.id
      );
      state.supportFunctionsMeasure += action.payload.supportFunctionsMeasure;

      state.supportFunctions = updated;
    },

    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },

    removeCurrentId: (state, action) => {
      state.currentId = null;
    },

    setSuccessIndicator: (state, action) => {
      const idx = state.coreFunctions.findIndex(
        (item) => item.id === action.payload.currentId
      );
      state.coreFunctions[idx].successIndicators.push({
        id: action.payload.id,
        title: action.payload.targetMeasure,
        actualAccomplishments: {
          title: action.payload.actualAccomplishment,
          rating: action.payload.rating,
        },
      });
    },
    setSupportSuccessIndicator: (state, action) => {
      const idx = state.supportFunctions.findIndex(
        (item) => item.id === action.payload.currentId
      );
      state.supportFunctions[idx].successIndicators.push({
        id: action.payload.id,
        title: action.payload.targetMeasure,
        actualAccomplishments: {
          title: action.payload.actualAccomplishment,
          rating: action.payload.rating,
        },
      });
    },
    editFunctions: (state, action) => {
      const { coreFunctions, supportFunctions } = action.payload;
      state.coreFunctions = coreFunctions;
      state.supportFunctions = supportFunctions;
    },
    deleteCoreSucessIndicator: (state, action) => {
      const { indicatorId, funcId } = action.payload;
      const funcIdx = state.coreFunctions.findIndex(
        (func) => func.id === funcId
      );
      const updated = state.coreFunctions[funcIdx].successIndicators.filter(
        (indicator) => indicator.id !== indicatorId
      );
      state.coreFunctions[funcIdx].successIndicators = updated;
    },
    deleteSupportSuccessIndicator: (state, action) => {
      const { indicatorId, funcId } = action.payload;
      const funcIdx = state.supportFunctions.findIndex(
        (func) => func.id === funcId
      );
      const updated = state.supportFunctions[funcIdx].successIndicators.filter(
        (indicator) => indicator.id !== indicatorId
      );
      state.supportFunctions[funcIdx].successIndicators = updated;
    },
    setTargetIndicator: (state, action) => {
      const { funcId, indicatorId } = action.payload;
      state.targetIndicator.funcId = funcId;
      state.targetIndicator.indicatorId = indicatorId;
    },
    editSuccessIndicator: (state, action) => {
      const { funcId, indicatorId, successIndicatorTitle, accomplishment } =
        action.payload;

      const funcIdx = state.coreFunctions.findIndex(
        (func) => func.id === funcId
      );

      const indicatorIdx = state.coreFunctions[
        funcIdx
      ].successIndicators.findIndex(
        (successIndicator) => successIndicator.id === indicatorId
      );

      const successIndicator =
        state.coreFunctions[funcIdx].successIndicators[indicatorIdx];
      successIndicator.title = successIndicatorTitle;
      successIndicator.actualAccomplishments.title = accomplishment;
    },
    editSupportSuccessIndicator: (state, action) => {
      const { funcId, indicatorId, successIndicatorTitle, accomplishment } =
        action.payload;

      const funcIdx = state.supportFunctions.findIndex(
        (func) => func.id === funcId
      );

      const indicatorIdx = state.supportFunctions[
        funcIdx
      ].successIndicators.findIndex(
        (successIndicator) => successIndicator.id === indicatorId
      );

      const successIndicator =
        state.supportFunctions[funcIdx].successIndicators[indicatorIdx];
      successIndicator.title = successIndicatorTitle;
      successIndicator.actualAccomplishments.title = accomplishment;
    },
  },
});

export default slice.reducer;
export const {
  setCoreFunctions,
  deleteCoreFunction,
  setCurrentId,
  removeCurrentId,
  setSuccessIndicator,
  setSupportFunctions,
  deleteSupportFunction,
  setSupportSuccessIndicator,
  editFunctions,
  deleteCoreSucessIndicator,
  deleteSupportSuccessIndicator,
  setTargetIndicator,
  editSuccessIndicator,
  editSupportSuccessIndicator,
} = slice.actions;

// selectors
export const getCreateEvaluation = createSelector(
  (state) => state.entities.createEvaluation,
  (evaluation) => evaluation
);
