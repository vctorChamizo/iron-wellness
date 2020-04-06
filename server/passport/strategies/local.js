const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { checkHashedPassword } = require("../../lib/hash-password");

const User = require("../../models/User");

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({
          $or: [{ username }, { email: username }],
        }).select("-updatedAt -createdAt -__v");

        user && checkHashedPassword(password, user.password)
          ? done(null, user)
          : done(null, false, { message: "BadCredentials" });
      } catch (error) {
        done(error);
      }
    }
  )
);
