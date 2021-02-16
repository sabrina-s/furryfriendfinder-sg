import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import axios from "axios";
import { DOGS_API } from "../../constants/api";
import { pick } from "lodash";
import UpdateDog from "./UpdateDog";

const DogModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [dog, setDog] = useState({});

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${DOGS_API}/${id}`)
      .then((response) => {
        const currentDog = pick(response.data, [
          "name",
          "description",
          "image",
          "gender",
          "hdbApproved",
          "available",
        ]);
        setDog(currentDog);
        setOpen(true);
      })
      .catch(console.error);
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <UpdateDog id={id} dog={dog} handleClose={handleClose} />
    </Dialog>
  );
};

export default DogModal;
