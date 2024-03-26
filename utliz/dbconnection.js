const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("connected to Database...");
      return
    }
    console.log("alredy connected to Database...");
    return;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};