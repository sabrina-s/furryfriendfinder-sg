import { createStore, combineReducers, applyMiddleware } from "redux";
import dogsReducer from "./dogs";
import alertsReducer from "./alerts";
import thunk from "redux-thunk";

const reducers = combineReducers({
  dogsReducer,
  alertsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
