const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Activity = require("../models/Activity");
const Class = require("../models/Class");

router.get("/", async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(await Activity.find().select("-updatedAt -createdAt -__v"));
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
        status: "ActivityExists",
      });
  } catch (e) {
    return e.name === "ValidationError"
      ? res.status(400).json({ status: "ValidationError", error: e.errors })
      : next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const activity = await Activity.findById({ _id: req.params.id }).select(
      "-updatedAt -createdAt -__v"
    );

    return activity
      ? res.status(200).json(activity)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { activity } = req.body;

    if (!(await Activity.findOne({ name: activity.name })))
      if ((await Class.find({ activity: req.params.id })).length === 0) {
        const updatedActivity = await Activity.findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: activity.name,
            desciption: activity.desciption,
            type: activity.type,
          },
          { new: true, runValidators: true }
        );

        return updatedActivity
          ? res.status(200).json(updatedActivity)
          : res.status(400).json({ status: "BadRequest" });
      } else return res.status(406).json({ ststus: "NotAcceptable" });
    else
      return res.status(401).json({
        status: "ActivityExists",
      });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : e.name === "ValidationError"
      ? res.status(400).json({ status: "ValidationError", error: e.errors })
      : next(e);
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    if ((await Class.find({ activity: req.params.id })).length === 0) {
      const result = await Activity.deleteOne({ _id: req.params.id });

      return result.n
        ? res.status(200).json({ status: "OperationSuccessful" })
        : res.status(400).json({ status: "BadRequest" });
    } else return res.status(406).json({ status: "NotAcceptable" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

module.exports = router;
