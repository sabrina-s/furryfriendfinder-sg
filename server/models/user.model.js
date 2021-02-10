const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    index: true,
    unique: true,
    minlength: 5,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

userSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.setPassword = async function (newPassword) {
  this.password = newPassword;
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.verifyJWT = function (token) {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
