require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// CORS
const cors = require("cors");
const origin = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://furryfriendfinder-sg.netlify.app";
  } else {
    return "http://localhost:3000";
  }
};
app.use(
  cors({
    origin: origin(),
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);

module.exports = app;
