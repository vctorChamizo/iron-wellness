require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { hashPassword } = require("../../lib/hash-password");

const User = require("../../models/User");

const BASE_PASSWORD = "wX9";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleID = profile.id;
      const email = profile._json.email;
      const username = profile._json.email.slice(
        0,
        profile._json.email.indexOf("@")
      );

      try {
        const user = await User.findOne({
          $or: [{ "social.googleID": googleID }, { username, email }],
        });

        if (user) return done(null, user);

        if (await User.findOne({ $or: [{ username }, { email }] }))
          return done(null, false, { message: "UserExists" });

        const newUser = await User.create({
          email,
          username,
          password: hashPassword(
            BASE_PASSWORD.concat(Math.random().toString(35))
          ),
          name: profile.name.givenName,
          surname: profile.name.familyName,
          image: profile._json.picture,
          type: "CLIENT",
          social: {
            googleID,
          },
        });
        return done(null, newUser, { message: "newUser" });
      } catch (error) {
        done(error);
      }
    }
  )
);
