const express = require("express");
const _ = require("lodash");

const { isLoggedIn, isClient } = require("../middleware/account-middleware");

const User = require("../models/User");
const Class = require("../models/Class");

const router = express.Router();

router.use(isLoggedIn());

router.get("/", async (req, res) => {
  try {
    return res
      .status(200)
      .json(
        (await User.find()).map(e =>
          _.pick(e, ["_id", "username", "name", "surname", "image", "type"])
        )
      );
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/type", async (req, res) => {
  try {
    return res.status(200).json(await User.find({ type: req.query.type }));
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/addclass/:id", isClient(), async (req, res) => {
  try {
    const resultUser = await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { classes: req.params.id } }
    );

    const resultClass = await Class.updateOne(
      { _id: req.params.id },
      { $addToSet: { students: req.user._id } }
    );

    return resultClass.n && resultUser.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/removeclass/:id", isClient(), async (req, res) => {
  try {
    const resultUser = await User.updateOne(
      {
        _id: req.user._id
      },
      { $pull: { classes: req.params.id } }
    );

    const resultClass = await Class.updateOne(
      {
        _id: req.params.id
      },
      { $pull: { students: req.user._id } }
    );

    return resultClass.n && resultUser.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.status(200).json(
      await User.findOne({ _id: req.params.id })
        .populate({
          path: "classes",
          select: ["_id", "name", "date"]
        })
        .select("-updatedAt -createdAt -__v")
    );
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { user } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: req.user._id
      },
      {
        email: user.email,
        username: user.username,
        name: user.name,
        surname: user.surname,
        date: user.date
      },
      { new: true, runValidators: true }
    );

    return updatedUser
      ? res.status(200).json(updatedUser)
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

module.exports = router;
