const mongoose = require("mongoose");

async function connectDB() {
  console.log("connecting");
  const connection = await mongoose.connect(
    "mongodb+srv://mesharialhouli12:94055598@cluster0.ktsye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log(`mongo connected: ${connection.connection.host}`);
}

module.exports = connectDB;
