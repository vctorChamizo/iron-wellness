const express = require("express");
const passport = require("passport");
const _ = require("lodash");

const User = require("../models/User");

const { isLoggedIn, isLoggedOut } = require("../middleware/account-middleware");
const { hashPassword } = require("../lib/hash-password");
const mailSender = require("../mail/index");

const router = express.Router();

const sendMail = async (user) => {
  return await mailSender({
    email: user.email,
    subject: `Bienvenido a IronWellness`,
    info: user,
    template: "welcome",
  });
};

router.post("/signup", isLoggedOut(), async (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      name,
      surname,
      image,
      date,
      type,
    } = req.body.user;

    if (type === "ADMIN")
      return res.status(406).json({ status: "NotAcceptable" });

    if (!(await User.findOne({ $or: [{ email }, { username }] }))) {
      const user = await User.create({
        email,
        username,
        password: hashPassword(password),
        name,
        surname,
        image,
        date,
        type,
      });

      await sendMail(user);

      req.login(user, (error) => {
        if (error) return next(error);
        return res
          .status(201)
          .json(
            _.pick(user, [
              "_id",
              "username",
              "email",
              "name",
              "surname",
              "date",
              "type",
            ])
          );
      });
    } else
      return res.status(401).json({
        status: "UserExists",
      });
  } catch (e) {
    return e.name === "ValidationError"
      ? res.status(400).json({ status: "ValidationError", error: e.errors })
      : next(e);
  }
});

router.post("/login", isLoggedOut(), (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ status: info.message });

    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get(
  "/google",
  isLoggedOut(),
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", async (error, user, info) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ status: info.message });
    if (info.message === "newUser") await sendMail(user);

    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn(), async (req, res, next) => {
  try {
    req.logout();
    return res.status(200).json({ status: "OperationSuccessful" });
  } catch (e) {
    return next(e);
  }
});

router.get("/loggedin", async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findOne({ _id: req.user._id })
        .populate({
          path: "classes",
          select: ["_id", "name", "date", "level"],
        })
        .select("_id username email name surname date image type");

      return user
        ? res.status(200).json(user)
        : res.status(400).json({ status: "BadRequest" });
    } catch (e) {
      return e.name === "CastError"
        ? res.status(400).json({ status: "BadRequest" })
        : next(e);
    }
  } else return res.status(204).json("NoContent");
});

module.exports = router;
