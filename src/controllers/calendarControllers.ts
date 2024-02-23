import { Booking } from "../models/booking";
import { Signup } from "../models/signup";
// const moment = require("moment");

export const SetDate = async (req, res) => {
  const dates = req.body;
  console.log("dates========>", dates);
  const exist = await Signup.find({ token: dates.token });
  if (exist.length > 0) {
    const insertData = new Booking({
      type: dates.type,
      startTime: dates.startTime,
      endTime: dates.endTime,
      date: dates.date,
      token: dates.token,
    });
    await insertData.save();
    res.json({ status: "Success" });
  } else {
    res.json({ status: "User does not exist" });
  }
};

export const GetDate = async (req, res) => {
  const dates = req.body;
  console.log("date=======>", dates);
  const exist = await Booking.find({ date: dates.date });
  console.log("exist=========>", exist);
  if (exist.length > 0) {
    res.json({ data: exist });
  } else {
    res.json({ data: [] });
  }
};
