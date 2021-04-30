const Dog = require("../models/dog.model");
const User = require("../models/user.model");
const { pick, isEmpty } = require("lodash");

const getDogs = async (req, res, next) => {
  try {
    const query = {};

    if (req.query.name) {
      query["name"] = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.hdbApprovedOnly === "true") {
      query["hdbApproved"] = req.query.hdbApprovedOnly;
    }

    if (req.query.available === "true") {
      query["available"] = req.query.available;
    }

    const dogs = !isEmpty(query)
      ? await Dog.find(query).exec()
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
      ]),
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
      { new: true },
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

const favouriteDogById = async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id);
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { favourites: dog },
    });

    res.status(200).json({
      message: `Favourited ${dog.name}!`,
    });
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
  favouriteDogById,
};
