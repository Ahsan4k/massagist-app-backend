import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  type: String,
  startDate: String,
  endDate: String,
  date: String,
  token: String,
});

export const Booking = mongoose.model("Booking", BookingSchema);
