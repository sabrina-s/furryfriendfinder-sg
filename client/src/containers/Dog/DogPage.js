import React, { useEffect } from "react";
import DogCard from "../../components/Dog/DogCard";
import { makeStyles } from "@material-ui/core";
import { getAllDogs } from "../../store/dogs";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 100px",
    justifyContent: "center",
  },
});

const DogPage = (props) => {
  const classes = useStyles();
  const { dogs } = props;

  useEffect(() => {
    props.getAllDogs();
  }, []);

  return (
    <div className={classes.root}>
      {dogs.map((dog) => (
        <DogCard dog={dog} key={dog._id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogsReducer.dogs,
  };
};

const mapDispatchToProps = {
  getAllDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogPage);
