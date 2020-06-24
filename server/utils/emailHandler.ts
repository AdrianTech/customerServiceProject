import nodemailer from "nodemailer";
import dotenv from "dotenv";
var CronJob = require("cron").CronJob;
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
    var job = new CronJob(
      "00 23 * * *",
      () => {
        this.sendEmailToClient({ message: "Its run at 23:00", email: "mojofw@gmail.com" });
      },
      null,
      true,
      "Europe/Warsaw"
    );
    job.start();
  }
}

const emailHandler = new EmailHandler();
export default emailHandler;
