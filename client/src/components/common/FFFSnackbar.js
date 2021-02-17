import React, { useState } from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    "&.MuiSnackbar-root": {
      marginBottom: "20px",
    },
  },
});

const FFFSnackbar = ({ severity, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      className={classes.root}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {children}
      </Alert>
    </Snackbar>
  );
};

export default FFFSnackbar;
