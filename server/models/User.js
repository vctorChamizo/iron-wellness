const mongoose = require("mongoose");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}/;
const USERNAME = /[a-zA-Z0-9_-]{3,15}/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, "Invalid email"]
    },
    password: {
      type: String,
      required: "Password is required"
      // match: [
      //   PASSWORD_PATTERN,
      //   "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers."
      // ]
    },
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      trim: true,
      match: [
        USERNAME,
        "Username must containt at least three characters and cannot spaces."
      ]
    },
    image: Object,
    name: {
      type: String,
      required: "Name is required"
    },
    surname: {
      type: String,
      required: "Surname is required"
    },
    date: String,
    type: {
      type: String,
      required: "Type is required",
      enum: ["ADMIN", "TRAINER", "CLIENT"]
    },
    classes: [{ type: mongoose.ObjectId, ref: "Class" }],
    social: {
      googleID: String
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("User", userSchema);

module.exports = model;
