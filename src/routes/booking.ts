export const router = require("express").Router();
const { SetDate, GetDate } = require("../controllers/calendarControllers");

router.route("/bookDate").post(SetDate);
router.route("/getDate").post(GetDate);
router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});

module.exports = router;
