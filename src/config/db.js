const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. Add your MongoDB Atlas connection string to the .env file."
    );
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB runtime error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    const atlasHelp =
      error.name === "MongooseServerSelectionError"
        ? `Check your MONGO_URI, Atlas database user credentials, IP access list, and internet connection. Original error: ${error.message}`
        : error.message;

    throw new Error(`MongoDB connection failed. ${atlasHelp}`);
  }
};

module.exports = connectDB;
