require("dotenv").config();

const mongoose = require("mongoose");

const connectionDB = async fn => {
  try {
    await mongoose.set("useCreateIndex", true).connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connection ready`);
    await fn();
  } catch (err) {
    console.error("Error connecting to mongo", err);
  } finally {
    await mongoose.disconnect();
    console.log("MonogDB disconnected");
  }
};

module.exports = connectionDB;
