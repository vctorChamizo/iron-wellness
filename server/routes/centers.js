const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Center = require("../models/Center");

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await Center.find());
  } catch (e) {
    return next(e);
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res, next) => {
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
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const center = await Center.findOne({ _id: req.params.id }).select(
      "-updatedAt -createdAt -__v"
    );

    return center
      ? res.status(200).json(center)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const result = await Center.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
