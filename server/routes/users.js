const express = require("express");
const _ = require("lodash");

const { isLoggedIn, isClient } = require("../middleware/account-middleware");
const uploadCloud = require("../middleware/uploader-middleware");

const User = require("../models/User");
const Class = require("../models/Class");

const router = express.Router();

router.use(isLoggedIn());

router.get("/", async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(
        (await User.find()).map(e =>
          _.pick(e, ["_id", "username", "name", "surname", "image", "type"])
        )
      );
  } catch (e) {
    return next(e);
  }
});

router.get("/type", async (req, res, next) => {
  try {
    return res.status(200).json(await User.find({ type: req.query.type }));
  } catch (e) {
    return next(e);
  }
});

router.post(
  "/upload",
  uploadCloud.single("imageUrl"),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ status: "BadRequest" });

      const updatedUser = await Users.findByIdAndUpdate(
        req.user._id,
        { image: req.file },
        { new: true }
      );

      return updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(400).json({ status: "BadRequest" });
    } catch (e) {
      return next(e);
    }
  }
);

router.get("/addclass/:id", isClient(), async (req, res, next) => {
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
  } catch (e) {
    return next(e);
  }
});

router.get("/removeclass/:id", isClient(), async (req, res, next) => {
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
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate({
        path: "classes",
        select: ["_id", "name", "date"]
      })
      .select("-updatedAt -createdAt -__v");

    return user
      ? res.status(200).json(user)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", async (req, res, next) => {
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
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
