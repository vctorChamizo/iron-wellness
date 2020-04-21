const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    city: {
      type: String,
      required: "City is required",
    },
    street: {
      type: String,
      required: "Street is required",
    },
    community: {
      type: String,
      required: "Community is required",
    },
    image: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Center", centerSchema);
