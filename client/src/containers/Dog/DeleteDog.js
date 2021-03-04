import React from "react";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteDog } from "../../store/dogs";

const DeleteDog = (props) => {
  const { id, handleClose } = props;

  const handleFormSubmit = () => {
    props.deleteDog(id);
    handleClose();
  };

  return (
    <DialogContent>
      <h2 className="fff__text_center fff__no_margin">Are you sure?</h2>
      <p>This will delete the selected dog.</p>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleFormSubmit} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dogs: state.dogsReducer.dogs,
    ownProps,
  };
};

const mapDispatchToProps = {
  deleteDog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDog);
