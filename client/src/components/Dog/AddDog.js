import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string, boolean } from "yup";
import FFFTextField from "../common/FFFTextField";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";
import { DOGS_API } from "../../constants/api";
import FFFSnackbar from "../common/FFFSnackbar";

const AddDog = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const addDog = (values) => {
    axios
      .post(DOGS_API, values, { withCredentials: true })
      .then((response) => setSuccessMessage(response.data.message))
      .catch(console.error);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      gender: "",
      hdbApproved: false,
    },
    onSubmit: (values) => {
      addDog(values);
    },
    validationSchema: object({
      name: string().required("Please enter name of dog."),
      gender: string().required("Please select gender."),
      description: string().required("Please enter a short description."),
      hdbApproved: boolean().required("Please specify if dog is HDB approved."),
    }),
  });

  return (
    <>
      <h2>Add a dog</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="forms__left"
        data-testid="add-dog-form"
      >
        <FFFTextField
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FFFTextField
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />

        <FFFTextField
          id="image"
          placeholder="Image name"
          onChange={formik.handleChange}
          value={formik.values.image}
          helperText="e.g. 'dog10feb2021.jpg'"
        />

        <FormControl error={formik.touched.gender && formik.errors.gender}>
          <InputLabel shrink>Gender</InputLabel>
          <Select
            id="gender"
            value={formik.values.gender}
            onChange={formik.handleChange("gender")}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              id="hdbApproved"
              checked={formik.values.hdbApproved}
              value={formik.values.hdbApproved}
              onChange={formik.handleChange}
            />
          }
          label="HDB Approved?"
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          data-testid="create-dog-btn"
        >
          Create
        </Button>
      </form>

      {successMessage && (
        <FFFSnackbar severity="success">{successMessage}</FFFSnackbar>
      )}
    </>
  );
};

export default AddDog;
