const { router } = require("./auth");
const { SetDate, GetDate } = require("../controllers/calendarBooking");

router.route("/bookDate").post(SetDate);
router.route("/getDate/:date").post(SetDate);
