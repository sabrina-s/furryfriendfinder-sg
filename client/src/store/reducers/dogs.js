import { GET_ALL_DOGS_SUCCESS, ADD_DOG_SUCCESS } from "../dogs";

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
    case ADD_DOG_SUCCESS:
      return {
        ...state,
        dogs: [...state.dogs, action.dog],
      };
    default:
      return state;
  }
}

export default dogsReducer;
