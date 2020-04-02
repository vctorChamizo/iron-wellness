const { connectionDB, dropIfExists } = require("./db-connection");

const User = require("../models/User");
const Center = require("../models/Center");
const Activity = require("../models/Activity");
const Class = require("../models/Class");

const users = require("./data/users");
const centers = require("./data/centers");
const activities = require("./data/activities");

connectionDB(async () => {
  await dropIfExists(User);
  await User.create(users);
  await dropIfExists(Center);
  await Center.create(centers);
  await dropIfExists(Activity);
  await Activity.create(activities);
  await dropIfExists(Class);
});
