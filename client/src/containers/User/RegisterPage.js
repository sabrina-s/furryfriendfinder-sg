import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { REGISTER_API } from "../../constants/api";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import axios from "axios";
import { Button } from "@material-ui/core";
import "../../stylesheets/forms.css";
import FFFTextField from "../../components/common/FFFTextField";
import { UserContext } from "../../context/User";

const RegisterPage = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(UserContext);

  const handleRegister = (values) => {
    axios
      .post(REGISTER_API, values)
      .then((response) => {
        setCurrentUser(response.data.user);
        history.push("/");
      })
      .catch(console.error);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      handleRegister(values);
    },
    validationSchema: object({
      username: string().min(5).required("Please enter username."),
      password: string().min(8).required("Please enter password."),
      confirmPassword: string()
        .oneOf([ref("password"), null], "Passwords must match.")
        .required("Please confirm password."),
    }),
  });

  return (
    <div className="register-page">
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

        <FFFTextField
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
