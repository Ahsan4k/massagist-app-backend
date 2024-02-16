export const router = require("express").Router();

const {
  Register,
  Login,
  Forgot,
  verifyNumber,
  Logout,
} = require("../controllers/authControllers");

router.route("/signup").post(Register);
router.route("/login").patch(Login);
router.route("/forgotpassword").patch(Forgot);
router.route("/verify").post(verifyNumber);
router.route("/logout").delete(Logout);
router.get("/get", (req: any, res: any) => {
  res.send(
    '<div style="display:flex;align-self:center"><h1>Success</h1></div>'
  );
});
