import axios from "axios";
import { DOGS_API } from "../constants/api";
import { sortBy } from "lodash";

const GET_ALL_DOGS = "GET_ALL_DOGS";
const GET_ALL_DOGS_SUCCESS = "GET_ALL_DOGS_SUCCESS";

export const getAllDogs = () => ({
  type: GET_ALL_DOGS,
});

export const getAllDogsFromAPI = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_DOGS });
    return axios
      .get(DOGS_API)
      .then((response) => {
        const dogs = response.data;
        const sortedDogs = sortBy(dogs, [(dog) => !dog.available]);
        dispatch({ type: GET_ALL_DOGS_SUCCESS, sortedDogs });
      })
      .catch(console.error);
  };
};
