import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
type Params = {
  email: string;
  html: string;
};

class EmailHandler {
  public async sendEmail({ email, html }: Params): Promise<undefined | boolean> {
    let transporter = nodemailer.createTransport({
      host: "mail41.mydevil.net",
      port: 587,
      secure: false,
      auth: {
        user: "customerservice@adriantech.eu",
        pass: process.env.EMAIL_PASS,
      },
    });
    try {
      await transporter.sendMail({
        from: '"Your Customer Service" <customerservice@adriantech.eu>',
        to: email,
        subject: "Your service provider",
        text: "Hello",
        html: html,
      });
    } catch (e) {
      return false;
    }
  }
}
const emailHandler = new EmailHandler();
export default emailHandler;
