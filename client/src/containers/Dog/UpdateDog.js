import React, { useState, useEffect } from "react";
import {
  DialogActions,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import axios from "axios";
import { DOGS_API } from "../../constants/api";
import { object, string, boolean } from "yup";
import FFFTextField from "../../components/common/FFFTextField";
import { isEmpty, pick } from "lodash";

const UpdateDog = ({ id, handleClose }) => {
  const [initValues, setInitValues] = useState({
    name: "",
    gender: "",
    description: "",
    image: "",
    available: false,
    hdbApproved: false,
  });

  useEffect(() => {
    axios
      .get(`${DOGS_API}/${id}`)
      .then((response) => {
        const currentDog = pick(response.data, [
          "name",
          "description",
          "image",
          "gender",
          "hdbApproved",
          "available",
        ]);
        setInitValues(currentDog);
      })
      .catch(console.error);
  }, [id]);

  const updateDog = (values) => {
    axios
      .put(`${DOGS_API}/${id}`, values, {
        withCredentials: true,
      })
      .then((response) => console.log(response.data.message))
      .catch(console.error);
  };

  const handleFormSubmit = () => {
    if (isEmpty(formik.errors)) {
      handleClose();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: (values) => {
      updateDog(values);
    },
    validationSchema: object({
      name: string().required("Please enter name of dog."),
      gender: string().required("Please select gender."),
      description: string().required("Please enter a short description."),
      hdbApproved: boolean().required("Please specify if dog is HDB approved."),
      available: boolean().required("Please specify if dog is available."),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="forms__center"
      data-testid="update-dog-form"
    >
      <h2 className="fff__text_center fff__no_margin">Update dog</h2>
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
        multiline
      />

      <FFFTextField
        id="image"
        placeholder="Image name"
        onChange={formik.handleChange}
        value={formik.values.image}
        helperText="e.g. 'dog10feb2021.jpg'"
      />

      <FormControl error={formik.touched.gender && !!formik.errors.gender}>
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

      <FormControlLabel
        control={
          <Checkbox
            id="available"
            checked={formik.values.available}
            value={formik.values.available}
            onChange={formik.handleChange}
          />
        }
        label="Available?"
      />

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

export default UpdateDog;
