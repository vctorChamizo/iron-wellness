const express = require("express");
const passport = require("passport");

const User = require("../models/User");

const { isLoggedIn, isLoggedOut } = require("../middleware/account-middleware");
const { hashPassword } = require("../lib/hash-password");

const router = express.Router();

router.post("/signup", isLoggedOut(), async (req, res) => {
  const {
    email,
    username,
    password,
    name,
    surname,
    image,
    date,
    type
  } = req.body.user;

  try {
    if (!(await User.findOne({ $or: [{ email }, { username }] }))) {
      const user = await User.create({
        email,
        username,
        password: hashPassword(password),
        name,
        surname,
        image,
        date,
        type
      });

      req.login(user, error => {
        if (error)
          return res.status(500).json({ status: "ServerError", error });
        return res.status(201).json(user);
      });
    } else
      return res.status(401).json({
        status: "UserExists"
      });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.post("/login", isLoggedOut(), (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json({ status: "ServerError", error });
    if (!user) return res.status(401).json({ status: info.message });

    req.logIn(user, error =>
      error
        ? res.status(500).json({ status: "ServerError", error })
        : res.status(200).json(req.user)
    );
  })(req, res, next);
});

router.get(
  "/google",
  isLoggedOut(),
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (error, user) => {
    if (error) return res.status(500).json({ status: "ServerError", error });

    req.logIn(user, error =>
      error
        ? res.status(500).json({ status: "ServerError", error })
        : res.status(200).json(req.user)
    );
  })(req, res, next);
});

router.get("/logout", isLoggedIn(), async (req, res) => {
  try {
    req.logout();
    return res.status(200).json({ status: "Log out" });
  } catch (error) {
    return res.status(500).json({ status: "ServerError", error });
  }
});

router.get("/loggedin", isLoggedIn(), async (req, res) =>
  res.status(200).json(req.user)
);

module.exports = router;
