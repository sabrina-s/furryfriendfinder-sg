import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { upperFirst } from "lodash";

const useStyles = makeStyles(() => ({
  root: {
    margin: "20px",
    width: "400px",
    "&.adopted": {
      opacity: "0.6",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  description: {
    paddingTop: "10px",
    overflow: "hidden",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
  },
  cover: {
    maxHeight: "250px",
  },
}));

const DogCard = ({ dog }) => {
  const classes = useStyles();
  const { name, description, gender, hdbApproved, image, available } = dog;
  const dogImage = image ? image : "placeholder-dog.svg";

  return (
    <Card className={`${classes.root} ${available ? "" : "adopted"}`}>
      <CardMedia
        component="img"
        className={classes.cover}
        image={`${process.env.PUBLIC_URL}/assets/${dogImage}`}
        title={`Picture of ${name}`}
        alt={`Picture of ${name}`}
      />
      <div className={classes.details}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {upperFirst(gender)}
            {hdbApproved ? ", HDB Approved" : ""}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.description}
          >
            {description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default DogCard;
