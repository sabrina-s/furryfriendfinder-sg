require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

const usersRouter = require("./routes/users.route");
app.use("/users", usersRouter);

module.exports = app;
