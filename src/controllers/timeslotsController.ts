import { Timeslots } from "../models/timeslots";

export const createTimeslot = async (req, res) => {
  const payload = req.body;

  const insertData = new Timeslots({
    type: payload.type,
    startTime: payload.startTime,
    endTime: payload.endTime,
    date: payload.date,
    duration: payload.duration,
    availability: payload.availability
  });
  await insertData.save();
  res.json({ status: "Success", message: "Record successfully created." });
};

export const getTimeslots = async (req, res) => {
    const date = req.query.date;
    const exist = await Timeslots.find({ date: date });
    console.log("EXIST ==> ", exist)
    if (exist.length > 0) {
      res.json({ data: exist });
    } else {
      res.json({ data: [] });
    }
  };
