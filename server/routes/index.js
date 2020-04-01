const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/account-middleware");

const auth = require("./auth");
const users = require("./users");

router.use("/auth", auth);

router.use(isLoggedIn());

router.use("/users", users);

module.exports = router;
