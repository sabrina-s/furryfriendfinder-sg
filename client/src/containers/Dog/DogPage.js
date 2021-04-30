import React, { useEffect, useState } from "react";
import DogCard from "../../components/Dog/DogCard";
import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";
import { searchDogs, getAvailableDogs } from "../../store/dogs";
// import { getAllDogs, searchDogs } from "../../store/dogs";
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
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20px",
  },
});

const DogPage = (props) => {
  const classes = useStyles();
  const { dogs, searchDogs, getAvailableDogs } = props;
  // const { dogs, searchDogs, getAllDogs } = props;
  const [query, setQuery] = useState({
    name: "",
    hdbApprovedOnly: false,
    available: true,
  });

  // useEffect(() => {
  //   getAllDogs();
  // }, [getAllDogs]);

  useEffect(() => {
    getAvailableDogs();
  }, [getAvailableDogs]);

  useEffect(() => {
    searchDogs(query);
  }, [searchDogs, query]);

  const handleNameChange = (e) => {
    setQuery({ ...query, name: e.target.value.trim() });
  };

  const handleHdbOnlyChange = () => {
    setQuery({
      ...query,
      hdbApprovedOnly: !query.hdbApprovedOnly,
    });
  };

  return (
    <>
      <div className={classes.filter}>
        <div>
          <FFFTextField onChange={handleNameChange} id="search-dog-name" />
          <Search />
        </div>
        <div>
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
      </div>
      <div className={`${classes.dogs} dogs`}>
        {/* {dogs &&
          dogs.map((dog) => {
            return dog.available ? <DogCard dog={dog} key={dog._id} /> : <></>;
          })} */}
        {dogs &&
          dogs.map((dog) => {
            return <DogCard dog={dog} key={dog._id} />;
          })}
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
  // getAllDogs,
  getAvailableDogs,
  searchDogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DogPage);
