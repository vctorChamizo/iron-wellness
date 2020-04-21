const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const _ = require("lodash");

const uploadCloud = multer({
  storage: cloudinaryStorage({
    cloudinary,
    folder: "iron-wellness/avatar",
    allowedFormats: ["jpg", "png"],
    filename: function (req, file, cb) {
      const userID = _.get(req, "user._id");
      const userFile = userID ? `avatar${userID}` : file;
      cb(undefined, userFile);
    },
  }),
});

module.exports = uploadCloud;
