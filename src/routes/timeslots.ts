import { createTimeslot } from "../controllers/timeslotsController";
export const router = require("express").Router();

router.route("/availableslots").post(createTimeslot);

router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});
