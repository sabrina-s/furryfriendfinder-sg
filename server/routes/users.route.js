const _ = require("lodash");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    const user = new User(_.pick(req.body, ["username", "password"]));
    await user.save();
    const token = user.generateJWT();

    return res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: true,
      })
      .json({
        message: `${user.username} registered successfully!`,
        user: _.pick(user, ["username"]),
      });
  } catch (error) {
    return res.status(400).json({ message: "Unable to register user." });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res.status(422).json({ message: "Invalid email or password." });

  const valid = await user.isValidPassword(req.body.password);

  if (!valid) {
    return res.status(422).json({ message: "Invalid email or password." });
  }

  const token = user.generateJWT();

  return res
    .status(200)
    .cookie("access_token", token, {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true,
    })
    .json({
      message: "Login success!",
      user: _.pick(user, ["id", "username"]),
    });
});

router.post("/logout", async (req, res) =>
  res
    .status(200)
    .clearCookie("access_token")
    .json({ message: "Logout success!" })
);

module.exports = router;