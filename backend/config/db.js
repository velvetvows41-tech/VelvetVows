const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('Database connection string is missing. Please define MONGO_URI or MONGODB_URI in Vercel Environment Variables.');
    return;
  }

  // Reuse existing connection if active
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    // Avoid double connection attempts when already connecting
    if (mongoose.connection.readyState === 2) {
      return;
    }

    cachedConnection = await mongoose.connect(uri, {
      bufferCommands: false, // Fail fast if offline instead of buffering queries
      serverSelectionTimeoutMS: 5000, // Timeout connection attempt after 5s
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
