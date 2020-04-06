const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const uploadCloud = multer({
  storage: cloudinaryStorage({
    cloudinary,
    folder: "iron-wellness",
    allowedFormats: ["jpg", "png"],
  }),
});

module.exports = uploadCloud;
