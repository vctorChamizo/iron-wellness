const express = require("express");
const _ = require("lodash");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");
const mailSender = require("../mail/index");

const Class = require("../models/Class");
const User = require("../models/User");
const Activity = require("../models/Activity");

const sendMail = async (users, template, oldClass, newClass) => {
  const subject =
    template === "modifiedClass"
      ? "Tu clase ha sido modificada"
      : "Tu clase ha sido eliminada";

  const userPromises = users.map((e) => User.findById({ _id: e }));
  const usersToEmail = await Promise.all(userPromises);

  const emailPromises = usersToEmail.map((user) =>
    mailSender({
      email: user.email,
      subject,
      info: { user, oldClass, newClass },
      template,
    })
  );

  return await Promise.all(emailPromises);
};

router.get("/", async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(await Class.find().select("-updatedAt -createdAt -__v"));
  } catch (e) {
    return next(e);
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { name, activity, trainer, date, level, size } = req.body._class;

    const checkTrainer = await User.findOne({ _id: trainer, type: "TRAINER" });
    const checkActivity = await Activity.findById({ _id: activity });

    if (checkActivity && checkTrainer) {
      const newClass = await Class.create({
        name,
        activity,
        trainer,
        date,
        level,
        size,
      });

      await User.updateOne(
        { _id: trainer },
        { $addToSet: { classes: newClass._id } }
      );

      return res
        .status(201)
        .json(
          _.pick(newClass, [
            "_id",
            "name",
            "activity",
            "trainer",
            "date",
            "level",
            "size",
          ])
        );
    }

    return res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : e.name === "ValidationError"
      ? res.status(400).json({ status: "ValidationError", error: e.errors })
      : next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const _class = await Class.findOne({ _id: req.params.id })
      .populate({
        path: "students",
        select: ["_id", "username", "name", "surname", "image"],
      })
      .populate({
        path: "trainer",
        select: ["_id", "username", "name", "surname", "image"],
      })
      .populate({ path: "activity", select: ["name", "type", "description"] })
      .select("-updatedAt -createdAt -__v");

    return _class
      ? res.status(200).json(_class)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { _class } = req.body;

    if (await User.findById(_class.trainer)) {
      const updatedClass = await Class.findByIdAndUpdate(
        { _id: req.params.id },
        {
          trainer: _class.trainer,
          date: _class.date,
        },
        { new: true, runValidators: true }
      );

      if (updatedClass && updatedClass.students.length > 0) {
        await sendMail(
          updatedClass.students,
          "modifiedClass",
          _class,
          updatedClass
        );

        return res.status(200).json(updatedClass);
      }
    }
    return res.status(400).json({ status: "BadRequest" });
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
    const _class = await Class.findByIdAndDelete({ _id: req.params.id });

    if (_class) {
      await sendMail(_class.students, "removeClass", _class);
      return res.status(200).json({ status: "OperationSuccessful" });
    }

    return res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

module.exports = router;
