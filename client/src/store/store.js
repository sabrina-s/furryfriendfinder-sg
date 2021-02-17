import { createStore, combineReducers, applyMiddleware } from "redux";
import dogsReducer from "./dogs";
import thunk from "redux-thunk";

const reducers = combineReducers({
  dogsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
