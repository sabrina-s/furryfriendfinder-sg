import React, { useEffect, useState } from "react";
import DogCard from "../../components/Dog/DogCard";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
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
  filter: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: "20px",
  },
  gender: {
    width: "100px",
  },
});

const DogPage = (props) => {
  const classes = useStyles();
  const { dogs, getAllDogs, searchDogs } = props;
  const [query, setQuery] = useState({
    name: "",
    gender: "all",
    hdbApprovedOnly: false,
  });

  useEffect(() => {
    getAllDogs();
  }, [getAllDogs]);

  useEffect(() => {
    searchDogs(query);
  }, [searchDogs, query]);

  const handleNameChange = (e) => {
    setQuery({ ...query, name: e.target.value.trim() });
  };

  const handleHdbOnlyChange = (e) => {
    setQuery({
      ...query,
      hdbApprovedOnly: !query.hdbApprovedOnly,
    });
  };

  const handleGenderChange = (e) => {
    setQuery({
      ...query,
      gender: e.target.value,
    });
  };

  return (
    <>
      <div className={classes.filter}>
        <div>
          <FFFTextField onChange={handleNameChange} />
          <Search />
        </div>
        <FormControl>
          <InputLabel shrink>Gender</InputLabel>
          <Select
            id="gender"
            value={query.gender}
            onChange={handleGenderChange}
            className={classes.gender}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              id="hdbApproved"
              checked={query.hdbApprovedOnly}
              value={query.hdbApprovedOnly}
              onChange={handleHdbOnlyChange}
            />
          }
          label="Only HDB approved"
        />
      </div>
      <div className={classes.dogs}>
        {dogs && dogs.map((dog) => <DogCard dog={dog} key={dog._id} />)}
        {dogs.length < 1 && <p>No dogs found with the name "{query.name}".</p>}
      </div>
    </>
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
