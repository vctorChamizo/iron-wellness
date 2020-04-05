const express = require("express");

const router = express.Router();

const { isAdmin, isLoggedIn } = require("../middleware/account-middleware");

const Class = require("../models/Class");
const User = require("../models/User");
const Activity = require("../models/Activity");

const sendMail = async (users, template, oldClass, newClass) => {
  const arrayPromises = [];

  const subject =
    template === "modifiedClas"
      ? "Tu clase ha sido modificada"
      : "Tu clase ha sido eliminada";

  users.map((e) => {
    arrayPromises.push(
      mailSender({
        email: user.email,
        subject,
        context: { e, newClass, oldClass },
        template,
      })
    );
  });

  return await Promise.all(arrayPromises);
};

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await Class.find());
  } catch (e) {
    return next(e);
  }
});

router.post("/create", isLoggedIn(), isAdmin(), async (req, res, next) => {
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
        size,
      });

      await User.updateOne(
        { _id: trainer },
        { $addToSet: { classes: _class._id } }
      );

      return res.status(201).json(_class);
    }

    return res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const _class = await Class.findOne({ _id: req.params.id })
      .populate({
        path: "students",
        select: ["_id", "username", "name", "surname"],
      })
      .populate({
        path: "trainer",
        select: ["_id", "username", "name", "surname", "type"],
      })
      .populate({ path: "activity", select: ["name", "type", "description"] })
      .select("-updatedAt -createdAt -__v");

    return _class
      ? res.status(200).json(_class)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const { _class } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      { _id: req.params.id },
      {
        trainer: _class.trainer,
        date: _class.date,
      },
      { new: true, runValidators: true }
    );

    await sendMail(
      updatedClass.students,
      "modifiedClass",
      _class,
      updatedClass
    );

    return updatedClass
      ? res.status(200).json(updatedClass)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const _class = await Class.findByIdAndDelete({ _id: req.params.id });

    await sendMail(_class.students, "removeClass", _class);

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
