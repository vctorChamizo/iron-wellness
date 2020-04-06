const express = require("express");
const router = express.Router();

const auth = require("./auth");
const users = require("./users");
const centers = require("./centers");
const activities = require("./activities");
const classes = require("./classes");

router.use("/auth", auth);
router.use("/users", users);
router.use("/centers", centers);
router.use("/activities", activities);
router.use("/classes", classes);

module.exports = router;
