import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DOGS_API } from "../../constants/api";
import { Box, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  dogMugshot: {
    width: "75%",
  },
  dogInfoContainer: {
    width: "75%",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "centre",
  },
});

const DogInfo = () => {
  let { dogId } = useParams();
  const classes = useStyles();
  const [dogData, setDogData] = useState({
    name: "Loading",
    image: "placeholder-dog.svg",
  });

  const renderDogInfo = (data) => {
    return (
      <Box className={classes.container}>
        <Box className={classes.dogInfoContainer}>
          <h1>{data.name}</h1>
        </Box>
        <Box className={classes.dogMugshot}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/${data.image}`}
            alt={data.name}
            width="75%"
          />
        </Box>
        <Box className={classes.dogInfoContainer}>
          <div>
            <p>Gender: {data.gender}</p>
            <p>HDB Approved: {data.hdbApproved ? "Yes" : "No"}</p>
            <p>Description: {data.description}</p>
          </div>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    axios.get(`${DOGS_API}/${dogId}`).then((response) => {
      setDogData(response.data);
    });
  }, [dogId]);

  return <>{renderDogInfo(dogData)}</>;
};

export default DogInfo;
