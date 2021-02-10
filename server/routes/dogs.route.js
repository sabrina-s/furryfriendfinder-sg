const express = require("express");
const Dog = require("../models/dog.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const dogs = await Dog.find({});
  res.status(200).json(dogs);
});

module.exports = router;
