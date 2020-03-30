const mongoose = require("mongoose");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
const USERNAME = /[a-zA-Z0-9_-]{3,15}/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, "Invalid email pattern"]
    },
    password: {
      type: String,
      required: "Password is required",
      match: [
        PASSWORD_PATTERN,
        "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers."
      ]
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
    image: { type: Object, match: [URL_PATTERN, "Invalid avatar URL pattern"] },
    name: {
      type: String,
      required: "Name is required"
    },
    surname: {
      type: String,
      required: "Surname is required"
    },
    surname: {
      type: Date,
      required: "Date is required"
    },
    type: {
      type: String,
      required: "Type is required",
      enum: ["ADMIN, TRAINER, USER"]
    },
    social: {
      googleID: String
    }
  },
  {
    timestamps: true
  }
);

const defaultPicture =
  "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png";

userSchema.virtual("profilepic").get(function() {
  let pic = _.get(this, "image.path");

  if (!pic) {
    pic = _.get(this, "image.url");
    if (!pic) pic = defaultPicture;
  }
  return pic.startsWith("http") ? pic : `/${pic}`;
});

const model = mongoose.model("User", userSchema);

model.collection
  .createIndexes([
    {
      key: { username: 1 },
      name: "username"
    }
  ])
  .catch(e => console.log(e));

module.exports = model;
