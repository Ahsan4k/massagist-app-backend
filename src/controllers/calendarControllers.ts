import { Booking } from "../models/booking";
import { Signup } from "../models/signup";
import { getMessaging } from "firebase-admin/messaging";

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
    if (recordExist.length > 0 && recordExist[0]?.count === 2) {
      return res.json({
        status: "Failed",
        message: "Can't book single slot more than 2 times.",
      });
    }
    if (recordExist.length > 0 && recordExist[0]?.count < 2) {
      const update = {
        count: dates.count + recordExist[0]?.count,
      };
      // await Timeslots.findOneAndUpdate(filter, { availability: false });
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
        email: dates.email,
        hands: dates.hands,
        price: dates.price,
      });
      await insertData.save();
      // if (dates.duration?.hands === "4") {
      //   await Timeslots.findOneAndUpdate(filter, { availability: false });
      // }
      const getToken = Signup.findOne({ email: dates.email });
      const message = {
        notification: {
          title: "Appointment",
          body: `You have booked on ${dates.date} from ${dates.startTime} to ${dates.endTime}`,
        },
        data: {
          screen: "Notifications",
        },
        token: getToken[0].fcmToken,
      };

      try {
        await getMessaging().send(message);
      } catch (error) {
        console.log(error);
      }
      res.json({ status: "Success", message: "Record successfully created." });
    }
  } else {
    res.json({ status: "Failed", message: "User does not exist" });
  }
};

export const GetDate = async (req, res) => {
  const dates = req.body;
  const exist = await Booking.find({ date: dates.date });
  if (exist.length > 0) {
    res.json({ data: exist });
  } else {
    res.json({ data: [] });
  }
};

export const GetBookingHistory = async (req, res) => {
  const book = req.body;
  const booking = await Booking.find({ email: book.email });
  if (booking.length > 0) {
    res.json({ data: booking });
  } else {
    res.json({ data: [] });
  }
};
