require("dotenv").config();

const { MongoError } = require("mongodb");
const mongoose = require("mongoose");

const connectionDB = async (fn) => {
  try {
    await mongoose
      .set("useCreateIndex", true)
      .connect(process.env.DB_URL_REMOTE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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

const dropIfExists = async (Model) => {
  try {
    await Model.collection.drop();
  } catch (error) {
    if (error instanceof MongoError)
      console.log(
        `Cannot drop collection ${Model.collection.name}, because does not exist in DB`
      );
    else throw error;
  }
};

module.exports = { connectionDB, dropIfExists };
