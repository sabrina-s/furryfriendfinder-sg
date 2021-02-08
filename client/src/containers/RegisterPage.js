import React from "react";
import { REGISTER_API } from "../constants/api";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import axios from "axios";

const RegisterPage = () => {
  const handleRegister = (values) => {
    axios
      .post(REGISTER_API, values)
      .then((response) => console.log(response))
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
      <form onSubmit={formik.handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterPage;
