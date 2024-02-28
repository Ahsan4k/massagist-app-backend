const nodeMailer = require("nodemailer");

let generatedOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return +otp;
};

const html = `
    <p> Your OTP code is ${generatedOTP()} </p>
`;

export const sendMailHandler = (email: string) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "wahasali22@gmail.com",
        pass: "rbch cram zmvt vyie",
      },
    });

     transporter.sendMail({
      from: "Wahas Mughal <wahasali22@gmail.com>",
      to: email,
      subject: "test",
      html: html,
    });

    return true

  } catch (e) {
    console.log(e);
    return false;
  }
};
