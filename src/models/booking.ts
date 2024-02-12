const mongoose = require("mongoose");

export const Booking = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  duration: String,
  token: String,
});
