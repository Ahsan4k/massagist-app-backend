import { createTimeslot, getTimeslots } from "../controllers/timeslotsController";
export const router = require("express").Router();

router.route("/createslots").post(createTimeslot);

router.route("/availableslots").get(getTimeslots);

router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});
