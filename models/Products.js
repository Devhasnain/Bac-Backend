const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    model: { type: String },
    price: { type: String },
    image: {
      filename: { type: String },
      mimetype: { type: String },
      path: { type: String },
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);

module.exports = Products;
