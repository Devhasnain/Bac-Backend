const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema(
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

const Cards = mongoose.model("Card", CardsSchema);

module.exports = Cards;
