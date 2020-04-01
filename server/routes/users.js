const express = require("express");
const _ = require("lodash");

const User = require("../models/User");
const Class = require("../models/Class");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    return res
      .status(200)
      .json(
        users.map(e =>
          _.pick(e, ["_id", "username", "name", "surname", "image"])
        )
      );
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });

    return res.status(200).json({ status: "OperationSuccessful" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { user } = req.body;

    const updatedUser = await User.findOneAndUpdate(
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
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.post("/search", async (req, res, next) => {
  try {
    const { search } = req.body;
    const user = await User.findOne({
      $or: [{ email: search }, { username: search }]
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
