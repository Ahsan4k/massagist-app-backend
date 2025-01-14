import { Signup } from "../models/signup";
import { EmailOTP } from "../models/emailotp";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sendMailHandler } from "../nodemailer";
import moment = require("moment");

export const Register = async (req: any, res: any) => {
  const details = req.body;

  try {
    const isExists = await Signup.findOne({
      $or: [{ phoneNumber: details.phoneNumber }, { email: details.email }],
    });
    if (isExists) {
      return res.json({ success: false, reason: "Account already exists" });
    }
    const id = new Date();
    const token = jwt.sign(
      { id, username: `${details.firstName} ${details.lastName}` },
      process.env.SECRET_KEY
    );
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(details.password, salt);

    const insertData = new Signup({
      firstName: details.firstName,
      lastName: details.lastName,
      phoneNumber: details.phoneNumber,
      email: details.email,
      password: newPassword,
      token: token,
      fcmToken: details.fcmToken,
    });
    await insertData.save();
    res.json({
      success: true,
      data: {
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        phoneNumber: details.phoneNumber,
        token: token,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

export const Login = async (req: any, res: any) => {
  const details = req.body;
  try {
    const data = await Signup.findOne({ email: details.email });
    if (!data) {
      res.json({ success: false, reason: "Email does not exist" });
    } else if (data) {
      const auth = await bcrypt.compare(details.password, data.password);
      if (!auth) {
        res.json({ success: false, reason: "Incorrect Password" });
      } else {
        const id = new Date();
        const token = jwt.sign(
          { id, username: `${details.firstName} ${details.lastName}` },
          process.env.SECRET_KEY
        );
        await Signup.findByIdAndUpdate(
          { _id: data._id },
          { token: token, fcmToken: details.fcmToken },
          { new: true, runValidators: true }
        );
        res.json({
          success: true,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            token: token,
          },
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

export const Forgot = async (req: any, res: any) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Signup.findOne({ email: email });
    if (!user) {
      res.json({ success: false, reason: "Email does not exist" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await Signup.findByIdAndUpdate(
        { _id: user._id },
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        success: true,
        message: "Your password has been changed successfully.",
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const verifyOTP = async (req: any, res: any) => {
  const otp = req.body.otp;
  try {
    const result = await EmailOTP.findOne({ otp: otp });
    if (result) {
      res.json({
        success: true,
        message: "OTP has been successfully verified.",
      });
    } else {
      res.json({ success: false, message: "OTP verification failed." });
    }
  } catch (error) {
    res.json(error);
  }
};

export const RequestOTP = async (req: any, res: any) => {
  let generatedOTP = () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return +otp;
  };
  let otp = generatedOTP();
  if (sendMailHandler(req.body.email, otp)) {
    const record = await EmailOTP.find({ email: req.body.email });
    if (record.length > 0) {
      await EmailOTP.findOneAndUpdate(
        { email: req.body.email },
        {
          otp: otp,
          updatedAt: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        }
      );
    } else {
      const emailOTP = new EmailOTP({
        email: req.body.email,
        otp: otp,
        createdAt: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      });
      await emailOTP.save();
    }
    res.json({
      success: true,
      message: `OTP has been sent to your email ${req.body.email}`,
    });
  }
};

export const Logout = async (req: any, res: any) => {
  const token = req.body.token;
  try {
    const result = await Signup.findOne({ token: token });
    if (result) {
      await Signup.updateOne({ _id: result._id }, { $unset: { token: "" } });
      res.json({ success: true, message: "User Logged Out" });
    } else {
      res.json({ success: false, message: "Token does not exist" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const ChangeNumber = async (req, res) => {
  const number = req.body.number;
  const email = req.body.email;
  try {
    await Signup.findOneAndUpdate({ email: email }, { phoneNumber: number });
    res.json({ success: true, message: "Phone number updated" });
  } catch (error) {
    res.json({ success: false, message: "Failed to update." });
  }
};
