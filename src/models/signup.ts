const mongoose = require("mongoose");

export const SignupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  token: String,
});

module.exports = mongoose.model("Signup", SignupSchema);
