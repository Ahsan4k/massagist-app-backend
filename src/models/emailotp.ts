import mongoose from "mongoose";

const EmailOTPSchema = new mongoose.Schema({
  email: String,
  otp: Number,
});

export const EmailOTP = mongoose.model("EmailOTP", EmailOTPSchema);
