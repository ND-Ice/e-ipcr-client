import { combineReducers } from "redux";
import evaluations from "./evaluations";
import createEvaluation from "./createEvaluation";

export default combineReducers({
  evaluations,
  createEvaluation,
});
