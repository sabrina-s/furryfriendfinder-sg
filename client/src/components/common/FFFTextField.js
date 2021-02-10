import React from "react";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&.MuiFormControl-root": {
      "&.MuiTextField-root": {
        marginBottom: "15px",
      },
    },
  },
});

const FFFTextField = ({
  id,
  type = "text",
  placeholder = `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
  onChange,
  value,
  error,
  helperText,
}) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      id={id}
      name={id}
      type={type}
      label={placeholder}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      error={error}
      helperText={helperText}
    />
  );
};

export default FFFTextField;
