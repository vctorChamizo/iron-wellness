const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id })
      .populate({
        path: "reviews",
        populate: { path: "movie", select: "title _id" }
      })
      .populate("favs");
    return res.render("users/profile", { user });
  } catch (error) {
    next(error);
  }
});

router.post("/editprofile", async (req, res, next) => {
  try {
    await User.updateOne(
      {
        _id: req.user._id
      },
      {
        email: req.body.email,
        username: req.body.username
      }
    );
    res.redirect("/users");
  } catch (error) {
    next(error);
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

router.get("/addfav", async (req, res, next) => {
  try {
    const { movie } = req.query;
    await User.updateOne(
      {
        _id: res.locals.user._id
      },
      {
        $addToSet: {
          favs: movie
        }
      }
    );
    res.redirect(`/movies/${movie}`);
  } catch (error) {
    next(error);
  }
});

router.get("/removefav", async (req, res, next) => {
  try {
    const { movie } = req.query;
    await User.updateOne(
      {
        _id: req.user._id
      },
      {
        $pull: {
          favs: movie
        }
      }
    );
    res.redirect(`/movies/${movie}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
