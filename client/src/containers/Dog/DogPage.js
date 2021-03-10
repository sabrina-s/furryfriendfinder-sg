import React, { useEffect, useState } from "react";
import DogCard from "../../components/Dog/DogCard";
import { makeStyles } from "@material-ui/core";
import { getAllDogs, searchDogs } from "../../store/dogs";
import { connect } from "react-redux";
import FFFTextField from "../../components/common/FFFTextField";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  dogs: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 100px",
    justifyContent: "center",
  },
  search: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  },
});

const DogPage = (props) => {
  const classes = useStyles();
  const { dogs, getAllDogs, searchDogs } = props;
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllDogs();
  }, [getAllDogs]);

  useEffect(() => {
    searchDogs(query);
  }, [searchDogs, query]);

  return (
    <div className="hiii">
      <div className={classes.search}>
        <FFFTextField onChange={(e) => setQuery(e.target.value)} />
        <Search />
      </div>
      <div className={classes.dogs}>
        {dogs.map((dog) => (
          <DogCard dog={dog} key={dog._id} />
        ))}
      </div>
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
  searchDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogPage);
