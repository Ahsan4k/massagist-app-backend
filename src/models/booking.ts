import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  duration: String,
  token: String,
  count: Number,
  email: String,
  hands: String,
  price: String,
  addons: {
    type: Array,
    default: []
  }
});

export const Booking = mongoose.model("Booking", BookingSchema);
