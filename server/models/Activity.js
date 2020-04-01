const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true
    },
    description: String,
    level: {
      type: String,
      required: "Level is required",
      enum: ["BEGGINER", "MEDIUM", "PROFESSIONAL"]
    },
    type: {
      type: String,
      required: "Type is required",
      enum: ["INDOOR", "OUTDOOR", "POOL"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Activity", activitySchema);
