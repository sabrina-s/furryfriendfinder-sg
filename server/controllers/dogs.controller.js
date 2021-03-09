const Dog = require("../models/dog.model");
const { pick } = require("lodash");

const getDogs = async (req, res, next) => {
  try {
    const nameQuery = req.query.name;
    const dogs = nameQuery
      ? await Dog.find({ name: { $regex: nameQuery, $options: "i" } }).exec()
      : await Dog.find({});
    res.status(200).json(dogs);
  } catch (err) {
    next(err);
  }
};

const addDog = async (req, res, next) => {
  try {
    const dog = new Dog(
      pick(req.body, [
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
  } catch (err) {
    next(err);
  }
};

const getDogById = async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id, ["-__v"]);
    res.status(200).json(dog);
  } catch (err) {
    next(err);
  }
};

const updateDogById = async (req, res, next) => {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      pick(req.body, [
        "name",
        "gender",
        "description",
        "hdbApproved",
        "available",
        "image",
      ]),
      { new: true }
    );

    res.status(200).json({ message: `${dog.name} updated successfully!` });
  } catch (err) {
    next(err);
  }
};

const deleteDogById = async (req, res, next) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `${dog.name} deleted successfully!` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDogs,
  addDog,
  getDogById,
  updateDogById,
  deleteDogById,
};
