import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DOGS_API } from "../../constants/api";
import { Box } from "@material-ui/core";
import axios from "axios";

// const useStyles = makeStyles({
//   dogs: {
//     display: "flex",
//     flexWrap: "wrap",
//     padding: "0 100px",
//     justifyContent: "center",
//   },
//   filter: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "column",
//     paddingTop: "20px",
//   },
// });

const DogInfo = () => {
  let { dogId } = useParams();
  const [dogData, setDogData] = useState({
    name: "Loading",
    image: "placeholder-dog.svg",
  });

  const renderDogInfo = (data) => {
    return (
      <div id="mugShotContainer">
        <Box id="dogMugshot" width="100%" maxWidth="500px">
          <img
            src={`${process.env.PUBLIC_URL}/assets/${data.image}`}
            alt={data.name}
            width="75%"
          />
        </Box>
        <Box id="dogInfoContainer" width="100%">
          <h1>{data.name}</h1>
          <div>
            <p>Gender: {data.gender}</p>
            <p>HDB Approved: {data.hdbApproved ? "Yes" : "No"}</p>
            <p>Description: {data.description}</p>
          </div>
        </Box>
      </div>
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
