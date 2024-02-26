import { Booking } from "../models/booking";
import { Signup } from "../models/signup";
import { Timeslots } from "../models/timeslots";
// const moment = require("moment");

export const SetDate = async (req, res) => {
  const dates = req.body;
  const filter = {
    date: dates.date,
    startTime: dates.startTime,
    endTime: dates.endTime,
  };
  const exist = await Signup.find({ token: dates.token });
  const recordExist = await Booking.find(filter);

  if (exist.length > 0) {
    if (recordExist.length > 0 && recordExist[0]?.count < 2) {
      const update = {
        count: dates.count + recordExist[0]?.count,
      };
      await Timeslots.findOneAndUpdate(filter, { availability: false });
      await Booking.findOneAndUpdate(filter, update);
      res.json({ status: "Success", message: "Record successfully updated." });
    } else {
      const insertData = new Booking({
        type: dates.type,
        startTime: dates.startTime,
        endTime: dates.endTime,
        date: dates.date,
        duration: dates.duration,
        token: dates.token,
        count: dates.count,
      });
      await insertData.save();
      if (dates.duration?.hands === "4") {
        await Timeslots.findOneAndUpdate(filter, { availability: false });
      }
      res.json({ status: "Success", message: "Record successfully created." });
    }
  } else {
    res.json({ status: "Failed", message: "User does not exist" });
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
