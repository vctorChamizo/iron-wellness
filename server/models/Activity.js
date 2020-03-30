const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true
    },
    description: {
      type: String,
      required: "City is required"
    },
    level: {
      type: String,
      required: "Level is required",
      enum: ["BEGGINER, MEDIUM, PROFESSIONAL"]
    },
    level: {
      type: String,
      required: "Type is required"
    }
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("Activity", activitySchema);

module.exports = model;
