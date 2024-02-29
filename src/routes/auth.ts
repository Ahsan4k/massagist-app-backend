export const router = require("express").Router();

const {
  Register,
  Login,
  Forgot,
  verifyOTP,
  Logout,
  RequestOTP
} = require("../controllers/authControllers");

router.route("/signup").post(Register);
router.route("/login").post(Login);
router.route("/requestotp").post(RequestOTP);
router.route("/forgotpassword").post(Forgot);
router.route("/verify").post(verifyOTP);
router.route("/logout").post(Logout);
router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});
