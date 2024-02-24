import mongoose from "mongoose";

const timeslotsSchema = new mongoose.Schema({
  type: String,
  startTime: String,
  endTime: String,
  date: String,
  duration: String,
  availability: Boolean
});

export const Timeslots = mongoose.model("Timeslots", timeslotsSchema);
