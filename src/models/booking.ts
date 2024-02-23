import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  token: String,
  count: Number,
});

export const Booking = mongoose.model("Booking", BookingSchema);
