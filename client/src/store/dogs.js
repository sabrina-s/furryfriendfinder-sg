import axios from "axios";
import { DOGS_API } from "../constants/api";
import { sortBy } from "lodash";

// action types
const GET_ALL_DOGS_SUCCESS = "GET_ALL_DOGS_SUCCESS";

// action creators
export const getAllDogsSuccess = (dogs) => ({
  type: GET_ALL_DOGS_SUCCESS,
  dogs,
});

export const getAllDogs = () => {
  return (dispatch) => {
    return axios
      .get(DOGS_API)
      .then((response) => sortBy(response.data, [(dog) => !dog.available]))
      .then((dogs) => {
        dispatch(getAllDogsSuccess(dogs));
      })
      .catch(console.error);
  };
};

// reducer
const initialState = {
  dogs: [],
  message: "",
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
