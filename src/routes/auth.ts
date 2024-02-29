export const router = require("express").Router();

const {
  Register,
  Login,
  Forgot,
  verifyNumber,
  Logout,
  RequestOTP
} = require("../controllers/authControllers");

router.route("/signup").post(Register);
router.route("/login").post(Login);
router.route("/requestotp").post(RequestOTP);
router.route("/forgotpassword").patch(Forgot);
router.route("/verify").post(verifyNumber);
router.route("/logout").post(Logout);
router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});
