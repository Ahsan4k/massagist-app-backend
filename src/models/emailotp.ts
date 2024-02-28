import mongoose from "mongoose";

const EmailOTPSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  createdAt: String,
  updatedAt: {
    type: String,
    default: ""
  }
});

export const EmailOTP = mongoose.model("EmailOTP", EmailOTPSchema);
