//require('dotenv').config();
const mongoose = require('mongoose');
const uris=process.env.MONGO_URI;
const connectDB = async () => {
  try {
   // console.log("Mongo URI:", process.env.MONGO_URI); // Debug
    await mongoose.connect(uris, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
