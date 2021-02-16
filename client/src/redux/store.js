import { createStore, combineReducers, applyMiddleware } from "redux";
import dogs from "./dogs.reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  dogs,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
