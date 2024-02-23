import { Timeslots } from "../models/timeslots";

export const createTimeslot = async (req, res) => {
  const payload = req.body;

  const insertData = new Timeslots({
    type: payload.type,
    startTime: payload.startTime,
    endTime: payload.endTime,
    date: payload.date,
  });
  await insertData.save();
  res.json({ status: "Success", message: "Record successfully created." });
};
