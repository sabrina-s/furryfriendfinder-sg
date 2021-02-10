const _ = require("lodash");
const express = require("express");
const Dog = require("../models/dog.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const dogs = await Dog.find({});
  res.status(200).json(dogs);
});

router.post("/", async (req, res, next) => {
  try {
    const dog = new Dog(
      _.pick(req.body, [
        "name",
        "gender",
        "description",
        "hdbApproved",
        "available",
        "image",
      ])
    );
    await dog.save();

    res.status(200).json({ message: `${dog.name} added successfully!` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
