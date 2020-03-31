const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      match: [EMAIL_PATTERN, "Invalid email"]
    },
    activity: {
      type: mongoose.ObjectId,
      ref: "Activity",
      required: "Activity is required"
    },
    students: [
      {
        type: mongoose.ObjectId,
        ref: "User"
      }
    ],
    trainer: {
      type: mongoose.ObjectId,
      ref: "User",
      required: "Trainer is required"
    },
    date: {
      type: Date,
      required: "Date is required"
    },
    size: { type: Number, required: "Size is required" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Class", classSchema);
