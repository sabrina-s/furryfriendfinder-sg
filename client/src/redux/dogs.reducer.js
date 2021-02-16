import { GET_ALL_DOGS_SUCCESS } from "./actionTypes";

const initialState = {
  dogs: [],
};

function dogsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS_SUCCESS:
      return {
        ...state,
        dogs: action.dogs,
      };
    default:
      return state;
  }
}

export default dogsReducer;
