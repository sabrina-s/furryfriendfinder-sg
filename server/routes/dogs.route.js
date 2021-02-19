const _ = require("lodash");
const express = require("express");
const Dog = require("../models/dog.model");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const dogs = await Dog.find({});
  res.status(200).json(dogs);
});

router.post("/", [auth.required, admin], async (req, res, next) => {
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

    res.status(200).json({ dog, message: `${dog.name} added successfully!` });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id, ["-__v"]);
    res.status(200).json(dog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", [auth.required, admin], async (req, res, next) => {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, [
        "name",
        "gender",
        "description",
        "hdbApproved",
        "available",
        "image",
      ])
    );

    res.status(200).json({ message: `${dog.name} updated successfully!` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [auth.required, admin], async (req, res, next) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `${dog.name} deleted successfully!` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
