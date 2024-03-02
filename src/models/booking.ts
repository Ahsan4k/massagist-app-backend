import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  duration: Object,
  token: String,
  count: Number,
  email: String,
});

export const Booking = mongoose.model("Booking", BookingSchema);
