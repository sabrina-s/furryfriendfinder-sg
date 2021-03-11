import React from "react";
import { useFormik } from "formik";
import { object, string, boolean } from "yup";
import FFFTextField from "../../components/common/FFFTextField";
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
import "../../stylesheets/forms.css";
import { addDog } from "../../store/dogs";
import { connect } from "react-redux";

const AddDog = (props) => {
  const addDog = (values, resetForm) => {
    props.addDog(values).then(() => resetForm());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
      gender: "",
      hdbApproved: false,
    },
    onSubmit: (values, { resetForm }) => {
      console.log("values: ", values);
      addDog(values, resetForm);
    },
    validationSchema: object({
      name: string().required("Please enter name of dog."),
      gender: string().required("Please select gender."),
      description: string().required("Please enter a short description."),
      hdbApproved: boolean().required("Please specify if dog is HDB approved."),
    }),
  });

  return (
    <div className="forms__container">
      <h2 className="fff__text_center fff__no_margin">Add a dog</h2>
      <form
        encType="multipart/form-data" // for images to work with Multer
        onSubmit={formik.handleSubmit}
        className="forms__center"
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
          multiline
        />

        <label>Choose image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
              formik.setFieldValue("image", e.target.result);
            };

            reader.readAsDataURL(file);
          }}
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

        <Button
          color="primary"
          variant="contained"
          type="submit"
          data-testid="create-dog-btn"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogsReducer.dogs,
  };
};

const mapDispatchToProps = {
  addDog,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDog);
