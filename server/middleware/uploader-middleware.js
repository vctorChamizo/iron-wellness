const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadCloud = multer({
  storage: cloudinaryStorage({
    cloudinary,
    folder: "iron-wellness",
    allowedFormats: ["jpg", "png"]
  })
});

module.exports = uploadCloud;
