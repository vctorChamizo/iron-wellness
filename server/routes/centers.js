const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Center = require("../models/Center");

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await Center.find());
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const { name, street, city, community, image } = req.body.center;

    if (!(await Center.findOne({ name })))
      return res
        .status(201)
        .json(await Center.create({ name, street, city, community, image }));
    else
      return res.status(401).json({
        status: "CenterExists"
      });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.status(200).json(await Center.findOne({ _id: req.params.id }));
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const result = await Center.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

module.exports = router;
