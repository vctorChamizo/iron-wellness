const mongoose = require("mongoose");

const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

const centerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true
    },
    city: {
      type: String,
      required: "City is required"
    },
    street: {
      type: String,
      required: "Street is required"
    },
    community: {
      type: String,
      required: "Community is required"
    },
    image: { type: Object, match: [URL_PATTERN, "Invalid avatar URL pattern"] }
  },
  {
    timestamps: true
  }
);

const defaultPicture =
  "https://cdn4.iconfinder.com/data/icons/fitness-color-2/256/fitness-gym-workout-sport-healthy-building-dumbbell-512.png";

centerSchema.virtual("profilepic").get(function() {
  let pic = _.get(this, "image.path");

  if (!pic) {
    pic = _.get(this, "image.url");
    if (!pic) pic = defaultPicture;
  }
  return pic.startsWith("http") ? pic : `/${pic}`;
});

module.exports = mongoose.model("Center", centerSchema);
