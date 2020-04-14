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
        await User.find({ type: { $not: { $regex: "^ADMIN$" } } }).select(
          "_id username name surname image type"
        )
      );
  } catch (e) {
    return next(e);
  }
});

router.get("/type", async (req, res, next) => {
  try {
    if (req.query.type === "ADMIN")
      return res.status(406).json({ status: "NotAcceptable" });

    return res
      .status(200)
      .json(
        await User.find({ type: req.query.type }).select(
          "_id username name surname image type"
        )
      );
  } catch (e) {
    return next(e);
  }
});

router.post(
  "/upload",
  uploadCloud.single("profileImage"),
  async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ status: "BadRequest" });

      const updatedUser = await User.findByIdAndUpdate(
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
    const _class = await Class.findById({ _id: req.params.id });

    if (_class) {
      if (_class.size - _class.students.length > 0) {
        await User.findByIdAndUpdate(req.user._id, {
          $addToSet: { classes: req.params.id },
        });

        await Class.findByIdAndUpdate(
          { _id: req.params.id },
          { $addToSet: { students: req.user._id } }
        );

        return res.status(200).json({ status: "OperationSuccessful" });
      } else return res.status(406).json({ status: "NotAcceptable" });
    } else return res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

router.get("/removeclass/:id", isClient(), async (req, res, next) => {
  try {
    if (await Class.findById({ _id: req.params.id })) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { classes: req.params.id },
      });

      await Class.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { students: req.user._id } }
      );

      return res.status(200).json({ status: "OperationSuccessful" });
    } else return res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate({
        path: "classes",
        select: ["_id", "name", "date"],
      })
      .select("_id username email name surname image type");

    return user
      ? res.status(200).json(user)
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { user } = req.body;

    if (req.user.type === "ADMIN" || req.user._id != req.params.id)
      return res.status(406).json({ status: "NotAcceptable" });

    const checkUser = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (checkUser._id == user._id) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        {
          email: user.email,
          username: user.username,
          name: user.name,
          surname: user.surname,
          date: user.date,
        },
        { new: true, runValidators: true }
      ).select("_id username email name surname image type");

      return updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(400).json({ status: "BadRequest" });
    } else
      return res.status(401).json({
        status: "UserExists",
      });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : e.name === "ValidationError"
      ? res.status(400).json({ status: "ValidationError", error: e.errors })
      : next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (req.user.type !== "ADMIN" && req.user._id != req.params.id)
      return res.status(406).json({ status: "NotAcceptable" });

    const user = await User.findOne({ _id: req.params.id });

    if (user.type === "TRAINER" && user.classes.length > 0)
      return res.status(406).json({ status: "NotAcceptable" });

    if (user.classes.length > 0) {
      const arrayPromises = user.classes.map((e) =>
        Class.updateOne({ _id: e }, { $pull: { students: req.user._id } })
      );

      await Promise.all(arrayPromises);
    }

    const result = await User.deleteOne({ _id: req.params.id });

    return result.n
      ? res.status(200).json({ status: "OperationSuccessful" })
      : res.status(400).json({ status: "BadRequest" });
  } catch (e) {
    return e.name === "CastError"
      ? res.status(400).json({ status: "BadRequest" })
      : next(e);
  }
});

module.exports = router;
