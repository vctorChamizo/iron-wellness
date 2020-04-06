const { connectionDB, dropIfExists } = require("./db-connection");

const { hashPassword } = require("../lib/hash-password");

const User = require("../models/User");
const Center = require("../models/Center");
const Activity = require("../models/Activity");
const Class = require("../models/Class");

const users = require("./data/users");
const centers = require("./data/centers");
const activities = require("./data/activities");

const hashUsers = users.map((e) => {
  e.password = hashPassword(e.password);
  return e;
});

connectionDB(async () => {
  await dropIfExists(User);
  await User.create(hashUsers);
  await dropIfExists(Center);
  await Center.create(centers);
  await dropIfExists(Activity);
  await Activity.create(activities);
  await dropIfExists(Class);
});