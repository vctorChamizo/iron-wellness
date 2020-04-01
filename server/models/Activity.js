const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true
    },
    description: String,
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
