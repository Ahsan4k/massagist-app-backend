import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  token: String,
});

export const Signup = mongoose.model("Signup", SignupSchema);
