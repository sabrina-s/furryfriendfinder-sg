import React, { useState, useEffect } from "react";
import axios from "axios";
import { DOGS_API } from "../../constants/api";
import DogCard from "../../components/Dog/DogCard";
import { makeStyles } from "@material-ui/core";
import { sortBy } from "lodash";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 100px",
    justifyContent: "center",
  },
});

const DogPage = () => {
  const classes = useStyles();
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios
      .get(DOGS_API)
      .then((response) => {
        const dogs = response.data;
        const sortedDogs = sortBy(dogs, [(dog) => !dog.available]);
        setDogs(sortedDogs);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={classes.root}>
      {dogs.map((dog) => (
        <DogCard dog={dog} key={dog._id} />
      ))}
    </div>
  );
};

export default DogPage;
