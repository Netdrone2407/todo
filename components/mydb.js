//require('dotenv').config();
const mongoose = require('mongoose');
const uris="mongodb+srv://netdrone24:Vaibs%402004@cluster0.rpz4c.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0";
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
