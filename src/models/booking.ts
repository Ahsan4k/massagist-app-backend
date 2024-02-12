const mongoose = require("mongoose");

export const BookingSchema = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  duration: String,
  token: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
