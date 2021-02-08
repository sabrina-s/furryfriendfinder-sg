import React, { useState } from "react";
import { LOGIN_API } from "../constants/api";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../stylesheets/forms.css";
import FFFTextField from "../components/common/FFFTextField";
import FFFSnackbar from "../components/common/FFFSnackbar";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (values) => {
    axios
      .post(LOGIN_API, values)
      .then((response) => console.log(response.data.user))
      .catch((err) => setErrorMessage(err.response.data.message));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: object({
      username: string().required("Please enter username."),
      password: string().required("Please enter password."),
    }),
  });

  return (
    <div className="login-page">
      <form onSubmit={formik.handleSubmit} className="forms__container">
        <FFFTextField
          id="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />

        <FFFTextField
          id="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>

        {errorMessage && (
          <FFFSnackbar severity="error">{errorMessage}</FFFSnackbar>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
