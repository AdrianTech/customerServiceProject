import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ClientModel from "../models/clientModel";
import moment from "moment-timezone";
import { IServices } from "../types/types";
var CronJob = require("cron").CronJob;
dotenv.config();
type Params = {
  email: string;
  html: string;
};
type IEmailClient = {
  clientName: string;
  when: string;
  leftDays: number;
  name: String;
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
        from: '"Customer Service 👻" <customerservice@adriantech.eu>',
        to: email,
        subject: "Your service provider",
        text: "Hello",
        html: html,
      });
    } catch (e) {
      return false;
    }
  }

  public async clientChecker() {
    var job = new CronJob(
      "00 19 * * *",
      () => {
        this.clientDataHandler();
      },
      null,
      true,
      "Europe/Warsaw"
    );
    job.start();
  }
  public async clientDataHandler(): Promise<any> {
    let thirtyDays: Array<IEmailClient> = [];
    let sixtyDays: Array<IEmailClient> = [];
    const clients: Array<object> = await ClientModel.find();
    let count: number;
    clients.forEach((client: any) => {
      client.typeOfService.forEach((service: IServices) => {
        count = moment(service.finishTime).diff(new Date(), "days");
        if (count < 30) {
          thirtyDays.push({ clientName: client.fullname, when: moment(service.finishTime).format("LLL"), leftDays: count, name: service.name });
        }
        if (count < 60 && count > 30) {
          sixtyDays.push({ clientName: client.fullname, when: moment(service.finishTime).format("LLL"), leftDays: count, name: service.name });
        }
      });
    });

    const html = this.arraysHandler(...[thirtyDays.sort((a: any, b: any) => a.leftDays - b.leftDays || <any>new Date(a.when) - <any>new Date(b.when)), sixtyDays.sort((a: any, b: any) => a.leftDays - b.leftDays || <any>new Date(a.when) - <any>new Date(b.when))]);
    this.sendEmail({ email: "mojofw@gmail.com", html });
  }
  public arraysHandler(...arrays: Array<Array<IEmailClient>>) {
    let htmlArrays: any = [];
    let result: string = "";
    let count: number = 0;
    arrays.forEach((i: Array<IEmailClient>) => {
      htmlArrays = i
        .map(
          (i: IEmailClient) => `<div style="font-weight: 700; color:white; font-family: Tahoma;">
      <h3 style="color:yellow">${i.clientName}</h3>
      <p> Left Days: ${i.leftDays}</p>
      <p> Date: ${i.when}</p>
      <p> Service name: ${i.name}</p>
      </div>`
        )
        .join("");
      return (result += `<div style="background-color: #18191a; padding: 20px 40px;">
      <h2 style="color: #aec9f5">These customers will end the following services within the next ${(count += 30)} days</h2>
      ${htmlArrays}</div>`);
    });
    return result;
  }
}

const emailHandler = new EmailHandler();
export default emailHandler;
