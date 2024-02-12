const Booking = require("../models/booking");
const { Signup } = require("../models/signup");
const moment = require("moment");

export const SetDate = async (req, res) => {
  const dates = req.body;
  const exist = await Signup.findOne({ token: dates.token });
  if (exist.length > 0) {
    const insertData = new Booking({
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
  console.log("logged======>");
  const dates = req.body;
  console.log("dates=======>", dates);
  const exist = await Booking.find({ date: dates.date });
  if (exist.length > 0) {
    res.json({ data: exist });
  } else {
    res.json({ data: [] });
  }
};
