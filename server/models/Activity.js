const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({});

const model = mongoose.model("Activity", activitySchema);

module.exports = model;
