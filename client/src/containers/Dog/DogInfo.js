import {
    Card,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
  } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { DOGS_API } from "../../constants/api";
import axios from "axios";

  const DogInfo = () => {
    let { dogId } = useParams();
    const [dogData, setDogData] = useState({
      name: "Loading",
      image: "placeholder-dog.svg",

    })

    const renderDogInfo = (data) => {
      return (<>
      <h1>{data.name}</h1>
      <img src={`${process.env.PUBLIC_URL}/assets/${data.image}`} alt={data.name} width="50%"/>
      <p>Gender: {data.gender}</p>
      <p>HDB Approved: {data.hdbApproved ? "Yes" : "No"}</p>
      <p>Description: {data.description}</p>
      </>)
      
    }

    useEffect(() => {
      axios.get(`${DOGS_API}/${dogId}`).then((response) => {
        console.log(response.data)
        setDogData(response.data)
      });
    }, [dogId])


      return (
      <>
        {renderDogInfo(dogData)}
        
      </>)
  }
  
  export default DogInfo;