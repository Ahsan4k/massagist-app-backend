import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  type: String,
  startDate: Date,
  endDate: Date,
  date: String,
  token: String,
  count: Number,
});

export const Booking = mongoose.model("Booking", BookingSchema);
