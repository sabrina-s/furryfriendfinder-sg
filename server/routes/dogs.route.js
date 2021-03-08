const { pick } = require("lodash");
const express = require("express");
const Dog = require("../models/dog.model");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const ctrl = require("../controllers/dogs.controller");

router.get("/", ctrl.getDogs);

router.post("/", [auth.required, admin], ctrl.addDog);

router.get("/:id", ctrl.getDogById);

router.put("/:id", [auth.required, admin], ctrl.updateDogById);

router.delete("/:id", [auth.required, admin], ctrl.deleteDogById);

module.exports = router;
