const express = require("express");
const passport = require("passport");

const User = require("../models/User");

const { isLoggedIn, isLoggedOut } = require("../middleware/account-middleware");
const { hashPassword } = require("../lib/hash-password");
const mailSender = require("../mail/index");

const router = express.Router();

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
      type
    } = req.body.user;

    if (type === "ADMIN") return res.status(400).json({ status: "BadRequest" });

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

      await sendMail(user);

      req.login(user, error => {
        if (error) throw error;
        return res.status(201).json(user);
      });
    } else
      return res.status(401).json({
        status: "UserExists"
      });
  } catch (e) {
    return next(e);
  }
});

router.post("/login", isLoggedOut(), (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) throw error;
    if (!user) return res.status(401).json({ status: info.message });

    req.logIn(user, error => {
      if (error) throw error;
      return res.status(200).json(req.user);
    });
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
  passport.authenticate("google", async (error, user) => {
    if (error) throw error;

    await sendMail(user);

    req.logIn(user, error => {
      if (error) throw error;
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

router.get("/loggedin", isLoggedIn(), async (req, res) =>
  res.status(200).json(req.user)
);

const sendMail = async user => {
  return await mailSender({
    email: user.email,
    subject: `Welcome to IronWellness ${user.username}`,
    context: user,
    template: "welcome"
  });
};

module.exports = router;
