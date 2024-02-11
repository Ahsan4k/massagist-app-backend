const { BookingSchema } = require("../models/booking");
const { Signup } = require("../models/signup");
const moment = require("moment");

export const SetDate = async (req, res) => {
  const dates = req.body;
  const exist = await Signup.findOne({ token: dates.token });
  if (exist.length > 0) {
    const insertData = new BookingSchema({
      type: dates.type,
      time: dates.time,
      date: dates.date,
      token: dates.token,
      duration: dates.duration,
    });
    insertData.save();
    res.json({ status: "Success" });
  } else {
    res.json({ status: "User does not exist" });
  }
};

export const GetDate = async (req, res) => {
  const dates = req.params;
  const exist = await BookingSchema.find({ date: dates.date });
  if (exist.length > 0) {
    const existingDates = await BookingSchema.find({ date: dates.date });
    res.json({ data: existingDates });
  } else {
    res.json({ data: [] });
  }
};
