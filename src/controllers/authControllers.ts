const Signup = require("../models/signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const Register = async (req: any, res: any) => {
  const details = req.body;
  try {
    const number = await Signup.findOne({ phoneNumber: details.phoneNumber });
    const email = await Signup.findOne({ email: details.email });
    if (number || number.length > 0 || email || email.length > 0) {
      res.json({ success: false, reason: "Account already exists" });
      return;
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
    if (!data || data.length < 1) {
      res.json({ success: false, reason: "Email does not exist" });
    } else if (data || data.legth > 0) {
      const auth = bcrypt.compare(details.password, data.password);
      if (!auth || auth.length < 1) {
        res.json({ success: false, reason: "Incorrect Password" });
      } else {
        const id = new Date();
        const token = jwt.sign(
          { id, username: `${details.firstName} ${details.lastName}` },
          process.env.SECRET_KEY
        );
        await Signup.findByIdAndUpdate(
          { _id: data._id },
          { token: token },
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
  const body = req.body;
  try {
    const find = await Signup.findOne({ phoneNumber: body.phoneNumber });
    if (!find || find.length < 1) {
      res.json({ success: false, reason: "Phone number does not exist" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.newPassword, salt);
      await Signup.findByIdAndUpdate(
        { _id: find._id },
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({ success: true, message: "Password was updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const verifyNumber = async (req: any, res: any) => {
  const body = req.body.phoneNumber;
  try {
    const result = await Signup.findOne({ phoneNumber: body.phoneNumber });
    if (result || result.length > 0) {
      res.json({ success: true, message: "Number Exists" });
    } else {
      res.json({ success: false, message: "Number does nt ex" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const Logout = async (req: any, res: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  try {
    const result = await Signup.findOne({ token: token });
    if (result || result.length > 0) {
      await Signup.findByIdAndDelete(
        { _id: result._id },
        { $unset: { token: 1 } }
      );
      res.json({ success: true, message: "User Logged Out" });
    } else {
      res.json({ success: false, message: "Token does not exist" });
    }
  } catch (error) {
    res.json(error);
  }
};
