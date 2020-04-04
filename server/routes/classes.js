const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Class = require("../models/Class");
const User = require("../models/User");
const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await Class.find());
  } catch (error) {
    throw error;
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const { name, activity, trainer, date, level, size } = req.body._class;

    const checkTrainer = await User.findById({ _id: trainer });
    const checkActivity = await Activity.findById({ _id: activity });

    if (checkActivity && checkTrainer) {
      const _class = await Class.create({
        name,
        activity,
        trainer,
        date,
        level,
        size
      });

      await User.updateOne(
        { _id: trainer },
        { $addToSet: { classes: _class._id } }
      );

      return res.status(201).json(_class);
    }

    return res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const _class = await Class.findOne({ _id: req.params.id })
      .populate({
        path: "students",
        select: ["_id", "username", "name", "surname"]
      })
      .populate({
        path: "trainer",
        select: ["_id", "username", "name", "surname", "type"]
      })
      .populate({ path: "activity", select: ["name", "type", "description"] })
      .select("-updatedAt -createdAt -__v");

    return _class
      ? res.status(200).json(_class)
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    throw error;
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const { _class } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        name: _class.name,
        activity: _class.activity,
        trainer: _class.trainer,
        date: _class.date,
        level: _class.level,
        size: _class.size
      },
      { new: true, runValidators: true }
    );

    return updatedClass
      ? res.status(200).json(updatedClass)
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res) => {
  try {
    const result = await Class.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
