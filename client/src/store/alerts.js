// action types
const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

// action creators
export const showSnackbar = (message, severity) => ({
  type: SHOW_SNACKBAR,
  message,
  severity,
});

export const clearSnackbar = () => ({
  type: CLEAR_SNACKBAR,
  message: "",
});

// reducer
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
