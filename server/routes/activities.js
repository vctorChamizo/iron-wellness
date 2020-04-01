const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await Activity.find());
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const { name, desciption, type, level } = req.body.activity;

    if (!(await Activity.findOne({ name })))
      return res
        .status(201)
        .json(await Activity.create({ name, desciption, type, level }));
    else
      return res.status(401).json({
        status: "ActivityExists"
      });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.status(200).json(await Activity.findOne({ _id: req.params.id }));
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const { activity } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        name: activity.name,
        desciption: activity.desciption,
        type: activity.type,
        level: activity.level
      },
      { new: true, runValidators: true }
    );

    return updatedActivity
      ? res.status(200).json(updatedActivity)
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const result = await Activity.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

module.exports = router;
