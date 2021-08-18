// action types
export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

// action creators
export const showSnackbar = (message, severity) => ({
  type: SHOW_SNACKBAR,
  message,
  severity,
});

const clearSnackbarSucess = () => ({
  type: CLEAR_SNACKBAR,
  message: "",
});

export const clearSnackbar = () => {
  // TOFIX: this is hacky
  return (dispatch) => {
    setTimeout(() => {
      dispatch(clearSnackbarSucess());
    }, 6000);
  };
};
