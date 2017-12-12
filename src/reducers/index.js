import { combineReducers } from "redux";

import optionsReducer from "./options";

export default combineReducers({
  options: optionsReducer
});
