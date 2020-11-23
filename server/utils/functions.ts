import { IServices, IUser } from "../types/types";
import ClientModel from "../models/clientModel";
import moment from "moment-timezone";
import { ServicesModel } from "../models/servicesModel";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const KEY: string = <string>process.env.KEY;
class Functions {
  public sorted(arr: Array<IServices>) {
    return arr.sort((a: any, b: any) => <any>new Date(a.finishTime) - <any>new Date(b.finishTime));
  }
  public async searchHelper(option: String, value: String) {
    let result: Array<object> = [];
    let currentObject: any = {};
    const lowercase = value.toString().toLowerCase();
    if (option === "clients") {
      const data = await ClientModel.find();
      result = data.filter((i: any) => {
        currentObject.fullname = i.fullname;
        currentObject.email = i.email;
        currentObject.phone = i.phone;
        for (let val in currentObject) {
          const iterate = currentObject[val].toString().toLowerCase();
          if (iterate.includes(lowercase)) return i;
        }
      });
    } else if (option === "services") {
      const data = await ServicesModel.find();
      result = data.filter((i: any) => {
        currentObject.fullname = i.name;
        currentObject.email = i.createdDate;
        currentObject.months = i.unitPrice;
        for (let val in currentObject) {
          const iterate = currentObject[val].toString().toLowerCase();
          if (iterate.includes(lowercase)) return i;
        }
      });
    }
    if (result.length === 0) throw "Not found";
    if (result.length > 10) throw "Too many results. Be more precise";
    return result;
  }
  public createEmailHtml(user: IUser, text: string, req?: any): string {
    const token = jwt.sign({ user: user._id }, KEY, { expiresIn: "2h" });
    // let setHostname: string = "";
    // process.env.NODE_ENV === "dev" ? (setHostname = "http://localhost:8080") : (setHostname = req.headers.origin);
    return `
    <div style="font-family: Tahoma">
    <h3>${text}</h3>
    <a href="${process.env.HOST_NAME}/your-settings/set-password?id=${encodeURIComponent(user._id)}&name=${encodeURIComponent(user.loginname)}&token=${encodeURIComponent(
      token
    )}"><button style="padding: 12px; margin: 20px; font-family: Tahoma; border-radius: 6px; background-color: darkblue; color: white; border: 1px solid black; font-weight: 700; cursor: pointer">Set your password</button></a>
    </div>
    `;
  }
  public totalPriceHelper(service: IServices): any {
    if (service.unitPrice) return parseFloat((moment(service.finishTime).diff(service.startTime, "months") * service.unitPrice).toFixed(2));
    else return 0;
  }
  public totalIncomeHelper(services: Array<IServices>) {
    return services.reduce((acc: any, curr) => acc + curr.totalPrice, 0).toFixed(2);
  }
}

const functions = new Functions();
export default functions;
