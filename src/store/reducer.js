import { combineReducers } from "redux";
import userReducer from "./user";
import entitiesReducer from "./entities";

export default combineReducers({
  entities: entitiesReducer,
  user: userReducer,
});
