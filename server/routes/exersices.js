const express = require("express");
const _ = require("lodash");

const router = express.Router();

const Exersice = require("../models/Exersice");

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await Exersice.find().select("week day image"));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
