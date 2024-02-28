const nodeMailer = require("nodemailer");

export const sendMailHandler = (email: string, otp: number) => {
  try {
    const html = `<p> Your OTP code is ${otp} </p>`;

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

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
