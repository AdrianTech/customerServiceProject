import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
type Params = {
  message: string;
  email: string;
};

class EmailHandler {
  public async sendEmailToClient({ message, email }: Params): Promise<any> {
    let transporter = nodemailer.createTransport({
      host: "mail41.mydevil.net",
      port: 587,
      secure: false,
      auth: {
        user: "customerservice@adriantech.eu",
        pass: process.env.EMAIL_PASS
      }
    });
    try {
      await transporter.sendMail({
        from: '"Customer Service 👻" <customerservice@adriantech.eu>',
        to: email,
        subject: "Your service provider",
        text: "Hello",
        html: `<b>${message}</b>`
      });
    } catch (e) {
      return false;
    }
  }

  public async clientChecker() {
    console.log("It's client checker");
  }
}

const emailHandler = new EmailHandler();
export default emailHandler;
