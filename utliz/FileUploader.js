const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const AssetStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bac/assets",
    resource_type: "auto",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "avi",
      "mp4",
      "webm",
    ],
  },
});

const EmployeeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bac/employees",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
    ],
  },
});

const DocsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bac/certificates",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
      "pdf"
    ],
  },
});

const ProductStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bac/products",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "webp",
      "pdf"
    ],
  },
});

const assetUploader = multer({storage:AssetStorage}).single("file");
const employeImageUploader = multer({storage:EmployeeStorage}).single("file");
const docsUploader = multer({storage:DocsStorage}).array("file", 5);
const productUploader = multer({storage:ProductStorage}).single("file");

module.exports = {
  assetUploader,
  cloudinary,
  employeImageUploader,
  docsUploader,
  productUploader
}