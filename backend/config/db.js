const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error(`[Troubleshooting] Please check if:`);
    console.error(`  1. Your current IP address is whitelisted in MongoDB Atlas (Network Access).`);
    console.error(`  2. Or if you have a local MongoDB server running and MONGO_URI in backend/.env points to it.`);
  }
};

module.exports = connectDB;
