const mongoose = require("mongoose");
const { MONGODB_URL } = require("../constants");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to the database");
  } catch (error) {
    console.error("error connecting to the database:", error);
  }
};

module.exports = connectDB;
