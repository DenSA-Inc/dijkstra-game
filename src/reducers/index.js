import { combineReducers } from "redux";

import optionsReducer from "./options";
import levelReducer from "./level";

export default combineReducers({
  options: optionsReducer,
  level: levelReducer
});
