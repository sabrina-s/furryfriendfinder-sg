require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

// CORS
const cors = require("cors");
app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:3000",
    credentials: true,
  })
);

// FILE UPLOADS
app.use("/uploads", express.static("uploads"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);
const dogsRouter = require("./routes/dogs.route");
app.use("/dogs", dogsRouter);

// Default error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message });
});

module.exports = app;
