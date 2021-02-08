require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

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

// Default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
});

module.exports = app;
