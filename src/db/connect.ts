const mongoose = require("mongoose");

export const connectDB = async (url: string) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};