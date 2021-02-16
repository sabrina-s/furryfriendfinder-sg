import axios from "axios";
import { DOGS_API } from "../constants/api";
import { sortBy } from "lodash";
import * as actions from "./actionTypes";

export const getAllDogsSuccess = (dogs) => ({
  type: actions.GET_ALL_DOGS_SUCCESS,
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
