import { createSlice, current } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "templates",
  initialState: {
    list: [],
    currentId: null,
    funcId: null,
    succId: null,
  },
  reducers: {
    templatesReceived: (state, action) => {
      state.list = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload.currentId;
    },
    setTargetIndicator: (state, action) => {
      const { funcId, succId } = action.payload;
      state.funcId = funcId;
      state.succId = succId;
    },

    // =================== core function =====================//
    addCoreFunctionRemarks: (state, action) => {
      const { currentId, funcId, succId, remarks } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const succIdx = state.list[templateIdx].coreFunctions[
        cfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].coreFunctions[cfIdx].successIndicators[succIdx];
      succ.remarks = remarks;
    },

    deleteCoreRating: (state, action) => {
      const { currentId, funcId, succId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const coreFunction = state.list[templateIdx].coreFunctions[cfIdx];
      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      const updatedAverage = coreFunction.rawAverage.filter(
        (ave) => ave.id !== succId
      );
      coreFunction.rawAverage = updatedAverage;
      succ.actualAccomplishments.rating = {};
    },

    editCoreRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const cfIdx = template.coreFunctions.findIndex((cf) => cf.id === funcId);
      const coreFunction = template.coreFunctions[cfIdx];

      const aveIdx = coreFunction.rawAverage.findIndex(
        (ave) => ave.id === succId
      );

      coreFunction.rawAverage[aveIdx] = {
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      };

      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },
    rateCoreFunction: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const cfIdx = template.coreFunctions.findIndex((cf) => cf.id === funcId);
      const coreFunction = template.coreFunctions[cfIdx];

      coreFunction.rawAverage.push({
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      });

      const succIdx = coreFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = coreFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },
    addCoreFunction: (state, action) => {
      const { currentId, percentage, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const template = state.list[templateIdx];
      template.coreFunctionsMeasure -= parseInt(percentage);

      template.coreFunctions.push({
        title: title,
        description: description,
        percentage: percentage,
        successIndicators: [],
        rawAverage: [],
        rating: {},
      });
    },
    deleteCoreFunction: (state, action) => {
      const { templateId, funcId, percentage } = action.payload;

      const templateIdx = state.list.findIndex(
        (template) => template._id === templateId
      );
      const updated = state.list[templateIdx].coreFunctions.filter(
        (cf) => cf.id !== funcId
      );
      state.list[templateIdx].coreFunctionsMeasure += parseInt(percentage);
      state.list[templateIdx].coreFunctions = updated;
    },
    addCoreSuccessIndicator: (state, action) => {
      const { currentId, funcId, id, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      state.list[templateIdx].coreFunctions[cfIdx].successIndicators.push({
        id,
        title,
        description,
        actualAccomplishments: {
          title: "",
          description: "",
          sentiment: "",
          rating: {},
        },
      });
    },
    editCoreFunction: (state, action) => {
      const { currentId, funcId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );

      const cf = state.list[templateIdx].coreFunctions[cfIdx];
      cf.title = title;
      cf.description = description;
    },
    deleteCoreSuccessIndicator: (state, action) => {
      const { succId, funcId, currentId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const updated = state.list[templateIdx].coreFunctions[
        cfIdx
      ].successIndicators.filter((succ) => succ.id !== succId);
      state.list[templateIdx].coreFunctions[cfIdx].successIndicators = updated;
    },
    editCoreSuccessIndicator: (state, action) => {
      const { succId, funcId, currentId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const succIdx = state.list[templateIdx].coreFunctions[
        cfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].coreFunctions[cfIdx].successIndicators[succIdx];

      succ.title = title;
      succ.description = description;
    },
    addCoreAccomplishment: (state, action) => {
      const { succId, funcId, currentId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const succIdx = state.list[templateIdx].coreFunctions[
        cfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].coreFunctions[cfIdx].successIndicators[succIdx];

      succ.actualAccomplishments.title = title;
      succ.actualAccomplishments.description = description;
    },
    deleteCoreAccomplishment: (state, action) => {
      const { succId, funcId, currentId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const cfIdx = state.list[templateIdx].coreFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const succIdx = state.list[templateIdx].coreFunctions[
        cfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].coreFunctions[cfIdx].successIndicators[succIdx];

      succ.actualAccomplishments.title = "";
      succ.actualAccomplishments.description = "";
    },
    //  ========================== support functions =================================  //
    addSupportFunctionRemarks: (state, action) => {
      const { currentId, funcId, succId, remarks } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const succIdx = state.list[templateIdx].supportFunctions[
        sfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].supportFunctions[sfIdx].successIndicators[
          succIdx
        ];
      succ.remarks = remarks;
    },

    deleteSupportRating: (state, action) => {
      const { currentId, funcId, succId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = state.list[templateIdx].supportFunctions[sfIdx];
      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      const updatedAverage = supportFunction.rawAverage.filter(
        (ave) => ave.id !== succId
      );
      supportFunction.rawAverage = updatedAverage;
      succ.actualAccomplishments.rating = {};
    },
    editSupportRating: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const sfIdx = template.supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = template.supportFunctions[sfIdx];

      const aveIdx = supportFunction.rawAverage.findIndex(
        (ave) => ave.id === succId
      );
      supportFunction.rawAverage[aveIdx] = {
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      };

      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },
    rateSupportFunction: (state, action) => {
      const { currentId, funcId, succId, quality, timeliness, efficiency } =
        action.payload;

      const rawScore = [
        quality && parseInt(quality),
        timeliness && parseInt(timeliness),
        efficiency && parseInt(efficiency),
      ];

      const newRawScore = rawScore.filter((score) => typeof score === "number");
      const rawAverage = newRawScore.reduce((acc, curr) => acc + curr, 0);

      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );

      const template = state.list[templateIdx];
      const sfIdx = template.supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const supportFunction = template.supportFunctions[sfIdx];

      supportFunction.rawAverage.push({
        id: succId,
        average: parseInt(rawAverage) / newRawScore.length,
      });

      const succIdx = supportFunction.successIndicators.findIndex(
        (succ) => succ.id === succId
      );
      const succ = supportFunction.successIndicators[succIdx];
      succ.actualAccomplishments.rating = {
        quality: parseInt(quality),
        timeliness: parseInt(timeliness),
        efficiency: parseInt(efficiency),
        average: parseInt(rawAverage) / newRawScore.length,
      };
    },
    addSupportFunction: (state, action) => {
      const { currentId, percentage, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const template = state.list[templateIdx];
      template.supportFunctionsMeasure -= parseInt(percentage);

      template.supportFunctions.push({
        title: title,
        description: description,
        percentage: percentage,
        successIndicators: [],
        rawAverage: [],
        rating: {},
      });
    },
    editSupportFunction: (state, action) => {
      const { currentId, funcId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (cf) => cf.id === funcId
      );
      const cf = state.list[templateIdx].supportFunctions[sfIdx];
      cf.title = title;
      cf.description = description;
    },
    deleteSupportFunction: (state, action) => {
      const { templateId, funcId, percentage } = action.payload;

      const templateIdx = state.list.findIndex(
        (template) => template._id === templateId
      );
      const updated = state.list[templateIdx].supportFunctions.filter(
        (cf) => cf.id !== funcId
      );
      state.list[templateIdx].supportFunctionsMeasure += parseInt(percentage);
      state.list[templateIdx].supportFunctions = updated;
    },
    addSupportSuccessIndicator: (state, action) => {
      const { currentId, funcId, id, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      state.list[templateIdx].supportFunctions[sfIdx].successIndicators.push({
        id,
        title,
        description,
        actualAccomplishments: {
          title: "",
          description: "",
          sentiment: "",
          rating: {},
        },
      });
    },
    deleteSupportSuccessIndicator: (state, action) => {
      const { succId, funcId, currentId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const updated = state.list[templateIdx].supportFunctions[
        sfIdx
      ].successIndicators.filter((succ) => succ.id !== succId);
      state.list[templateIdx].supportFunctions[sfIdx].successIndicators =
        updated;
    },
    editSupportSuccessIndicator: (state, action) => {
      const { succId, funcId, currentId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const succIdx = state.list[templateIdx].supportFunctions[
        sfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);

      const succ =
        state.list[templateIdx].supportFunctions[sfIdx].successIndicators[
          succIdx
        ];
      succ.title = title;
      succ.description = description;
    },
    addSupportAccomplishment: (state, action) => {
      const { succId, funcId, currentId, title, description } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const succIdx = state.list[templateIdx].supportFunctions[
        sfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].supportFunctions[sfIdx].successIndicators[
          succIdx
        ];
      succ.actualAccomplishments.title = title;
      succ.actualAccomplishments.description = description;
    },
    deleteSupportAccomplishment: (state, action) => {
      const { succId, funcId, currentId } = action.payload;
      const templateIdx = state.list.findIndex(
        (template) => template._id === currentId
      );
      const sfIdx = state.list[templateIdx].supportFunctions.findIndex(
        (sf) => sf.id === funcId
      );
      const succIdx = state.list[templateIdx].supportFunctions[
        sfIdx
      ].successIndicators.findIndex((succ) => succ.id === succId);
      const succ =
        state.list[templateIdx].supportFunctions[sfIdx].successIndicators[
          succIdx
        ];

      succ.actualAccomplishments.title = "";
      succ.actualAccomplishments.description = "";
    },

    // unsubmit
    unSubmit: (state, action) => {
      const {
        responseId,
        coreFunctions,
        supportFunctions,
        coreFunctionsMeasure,
        supportFunctionsMeasure,
      } = action.payload;
      const responseIdx = state.list.findIndex(
        (response) => response._id === responseId
      );

      const response = state.list[responseIdx];
      response.coreFunctions = coreFunctions;
      response.supportFunctions = supportFunctions;
      response.coreFunctionsMeasure = coreFunctionsMeasure;
      response.supportFunctionsMeasure = supportFunctionsMeasure;
    },
  },
});

export const {
  templatesReceived,
  setCurrentId,
  setTargetIndicator,
  unSubmit,

  // core function
  addCoreFunctionRemarks,
  addCoreFunction,
  rateCoreFunction,
  deleteCoreFunction,
  editCoreFunction,
  addCoreSuccessIndicator,
  editCoreSuccessIndicator,
  deleteCoreSuccessIndicator,
  addCoreAccomplishment,
  deleteCoreAccomplishment,
  editCoreRating,
  deleteCoreRating,

  // support function
  editSupportRating,
  addSupportFunctionRemarks,
  rateSupportFunction,
  addSupportFunction,
  editSupportFunction,
  deleteSupportFunction,
  addSupportSuccessIndicator,
  deleteSupportSuccessIndicator,
  editSupportSuccessIndicator,
  addSupportAccomplishment,
  deleteSupportAccomplishment,
  deleteSupportRating,
} = slice.actions;
export default slice.reducer;

export const getTemplates = createSelector(
  (state) => state.entities.templates,
  (templates) => templates
);
