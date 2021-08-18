import { combineReducers } from "redux";
import dogsReducer from "./dogs";
import alertsReducer from "./alerts";

const reducers = combineReducers({
  dogsReducer,
  alertsReducer,
});

export default reducers;
