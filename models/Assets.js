const mongoose = require("mongoose");

const AssetsSchema = new mongoose.Schema(
  {
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    path: { type: String },
    size: { type: Number },
    filename: { type: String },
  },
  { timestamps: true }
);

const Assets = mongoose.model("Asset", AssetsSchema);

module.exports = Assets;
