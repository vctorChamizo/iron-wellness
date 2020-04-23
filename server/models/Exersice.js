const mongoose = require("mongoose");

const exersiceSchema = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: "Week is required",
    },
    day: {
      type: Number,
      required: "Day is required",
    },
    image: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exersice", exersiceSchema);
