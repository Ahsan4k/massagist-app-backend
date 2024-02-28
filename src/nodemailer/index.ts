const nodeMailer = require("nodemailer");

export const sendMailHandler = (email: string, otp: number) => {
  try {
    const html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color:#800000;text-decoration:none;font-weight:600">The Massagist</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing The Massagist. Use the following OTP to complete your Forgot Password process.</p>
        <h2 style="background:#800000;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />The Massagist</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>The Massagist</p>
            <p>Illinois</p>
        </div>
        </div>
    </div>`;

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
      from: "The Massagist <support@messagist.com>",
      to: email,
      subject: "Email Verification",
      html: html,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
