const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Activity = require("../models/Activity");

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await Activity.find());
  } catch (e) {
    return next(e);
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { name, description, type } = req.body.activity;

    if (!(await Activity.findOne({ name })))
      return res
        .status(201)
        .json(await Activity.create({ name, description, type }));
    else
      return res.status(401).json({
        status: "ActivityExists"
      });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const activity = await Activity.findOne({ _id: req.params.id }).select(
      "-updatedAt -createdAt -__v"
    );

    return activity
      ? res.status(200).json(activity)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { activity } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: activity.name,
        desciption: activity.desciption,
        type: activity.type
      },
      { new: true, runValidators: true }
    );

    return updatedActivity
      ? res.status(200).json(updatedActivity)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const result = await Activity.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
