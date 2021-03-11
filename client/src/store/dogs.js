import axios from "axios";
import { DOGS_API } from "../constants/api";
import { sortBy } from "lodash";
import { showSnackbar, clearSnackbar } from "./alerts";

// action types
const GET_ALL_DOGS_SUCCESS = "GET_ALL_DOGS_SUCCESS";
const GET_ALL_DOGS_FAILURE = "GET_ALL_DOGS_FAILURE";
const ADD_DOG_SUCCESS = "ADD_DOG_SUCCESS";

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

export const searchDogs = (query) => {
  return (dispatch) => {
    return axios
      .get(
        `${DOGS_API}?name=${query.name}&hdbApprovedOnly=${query.hdbApprovedOnly}`
      )
      .then((response) => sortBy(response.data, [(dog) => !dog.available]))
      .then((dogs) => dispatch(getAllDogsSuccess(dogs)))
      .catch((error) => dispatch(getAllDogsFailure(error)));
  };
};

const addDogSuccess = (dog) => ({
  type: ADD_DOG_SUCCESS,
  dog: dog,
});

export const addDog = (values) => {
  return (dispatch) => {
    return axios
      .post(DOGS_API, values, { withCredentials: true })
      .then((response) => {
        const dog = response.data.dog;
        const message = response.data.message;
        dispatch(addDogSuccess(dog));
        dispatch(showSnackbar(message));
        dispatch(clearSnackbar());
      })
      .catch(console.error);
  };
};

export const updateDog = (id, values) => {
  return (dispatch) => {
    return axios
      .put(`${DOGS_API}/${id}`, values, {
        withCredentials: true,
      })
      .then((response) => {
        const message = response.data.message;
        dispatch(getAllDogs());
        dispatch(showSnackbar(message));
        dispatch(clearSnackbar());
      })
      .catch(console.error);
  };
};

export const deleteDog = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${DOGS_API}/${id}`, { withCredentials: true })
      .then((response) => {
        const message = response.data.message;
        dispatch(getAllDogs());
        dispatch(showSnackbar(message));
        dispatch(clearSnackbar());
      })
      .catch(console.error);
  };
};

// reducer
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
