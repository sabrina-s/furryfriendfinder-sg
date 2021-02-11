import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { upperFirst } from "lodash";

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
  placeholder = upperFirst(id),
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
