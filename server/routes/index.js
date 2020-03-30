const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/account-middleware");

router.get("/", async (req, res, next) => {
  res.status(200).json("HOLA");
});

const auth = require("./auth");
const users = require("./users");

router.use("/auth", auth);

router.use(isLoggedIn());

router.use("/users", users);

module.exports = router;
