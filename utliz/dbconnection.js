const mongoose = require("mongoose");
require("dotenv").config();
module.exports =async () => {
  try {
    if (mongoose.connections[0].readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("db connected...");
      return;
    }
    console.log("already connected");
  } catch (error) {
    console.log(error?.message)
    process.exit(1);
  }
};
