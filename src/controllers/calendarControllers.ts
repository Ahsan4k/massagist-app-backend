import { Booking } from "../models/booking";
import { Signup } from "../models/signup";
// const moment = require("moment");

export const SetDate = async (req, res) => {
  const dates = req.body;
  // console.log("body=========>", dates);
  const filter = {
    date: dates.date,
    startDate: dates.startDate,
    endDate: dates.endDate,
  };
  const exist = await Signup.find({ token: dates.token });
  const recordExist = await Booking.find(filter);

  if (exist.length > 0) {
    if (recordExist.length > 0 && recordExist[0]?.count < 2) {
      const update = {
        count: dates.count + recordExist[0]?.count,
      };
      const val = await Booking.findOneAndUpdate(filter, update);
    } else {
      const insertData = new Booking({
        type: dates.type,
        startDate: dates.startDate,
        endDate: dates.endDate,
        date: dates.date,
        token: dates.token,
        count: dates.count,
      });
      await insertData.save();
      res.json({ status: "Success" });
    }
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
