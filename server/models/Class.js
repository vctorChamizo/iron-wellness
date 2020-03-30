const mongoose = require("mongoose");

const classSchema = new mongoose.Schema();

const model = mongoose.model("Class", classSchema);

module.exports = model;
