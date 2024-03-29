import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN_API } from "../../constants/api";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../../stylesheets/forms.css";
import FFFTextField from "../../components/common/FFFTextField";
import FFFSnackbar from "../../components/common/FFFSnackbar";
import { UserContext } from "../../context/User";

const LoginPage = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (values) => {
    axios
      .post(LOGIN_API, values, { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data.user);
        history.push("/");
      })
      .catch((err) => {
        err.response && setErrorMessage(err.response.data.message);
      });
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
      <form onSubmit={formik.handleSubmit} className="forms__center">
        <FFFTextField
          id="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />

        <FFFTextField
          id="password"
          type="password"
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
