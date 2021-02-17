import axios from "axios";
import { DOGS_API } from "../constants/api";
import { sortBy } from "lodash";

// action types
const GET_ALL_DOGS_SUCCESS = "GET_ALL_DOGS_SUCCESS";
const GET_ALL_DOGS_FAILURE = "GET_ALL_DOGS_FAILURE";
const ADD_DOG_SUCCESS = "ADD_DOG_SUCCESS";
const UPDATE_DOG_SUCCESS = "UPDATE_DOG_SUCCESS";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";

// action creators
const getAllDogsSuccess = (dogs) => ({
  type: GET_ALL_DOGS_SUCCESS,
  dogs,
});

const getAllDogsFailure = (error) => ({
  type: GET_ALL_DOGS_FAILURE,
  error,
});

export const getAllDogs = () => {
  return (dispatch) => {
    return axios
      .get(DOGS_API)
      .then((response) => sortBy(response.data, [(dog) => !dog.available]))
      .then((dogs) => dispatch(getAllDogsSuccess(dogs)))
      .catch((error) => dispatch(getAllDogsFailure(error)));
  };
};

const addDogSuccess = (dog, message) => ({
  type: ADD_DOG_SUCCESS,
  dog: dog,
  message: message,
});

export const addDog = (values) => {
  return (dispatch) => {
    return axios
      .post(DOGS_API, values, { withCredentials: true })
      .then((response) => {
        const dog = response.data.dog;
        const message = response.data.message;
        dispatch(addDogSuccess(dog, message));
        // TOFIX: this is hacky
        // required because `message` for FFFSnackbar in AddDog does not clear out
        setTimeout(() => {
          dispatch(clearMessage());
        }, 6000);
      })
      .catch(console.error);
  };
};

const updateDogSuccess = (message) => ({
  type: UPDATE_DOG_SUCCESS,
  message,
});

export const updateDog = (id, values) => {
  return (dispatch) => {
    return axios
      .put(`${DOGS_API}/${id}`, values, {
        withCredentials: true,
      })
      .then((response) => {
        const message = response.data.message;
        dispatch(getAllDogs());
        dispatch(updateDogSuccess(message));
        // TOFIX: same as above
        setTimeout(() => {
          dispatch(clearMessage());
        }, 6000);
      })
      .catch(console.error);
  };
};

const clearMessage = () => ({
  type: CLEAR_MESSAGE,
  message: "",
});

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
    case ADD_DOG_SUCCESS:
      return {
        ...state,
        dogs: [...state.dogs, action.dog],
        message: action.message,
      };
    case UPDATE_DOG_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
}

export default dogsReducer;
