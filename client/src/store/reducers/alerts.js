import { SHOW_SNACKBAR, CLEAR_SNACKBAR } from "../alerts";

const initialState = {
  message: "",
  severity: "success",
};

function alertsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        message: action.message,
        severity: action.severity,
      };
    case CLEAR_SNACKBAR:
      return {
        message: action.message,
      };
    default:
      return state;
  }
}

export default alertsReducer;
