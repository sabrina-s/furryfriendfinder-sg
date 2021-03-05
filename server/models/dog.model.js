const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    description: {
      type: String,
      required: true,
    },
    hdbApproved: {
      type: Boolean,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
