import { combineReducers } from "redux";
import evaluations from "./evaluations";
import templates from "./templates";

export default combineReducers({
  evaluations,
  templates,
});
