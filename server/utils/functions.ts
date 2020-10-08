import { IServices } from "../types/types";
import ClientModel from "../models/clientModel";
import { ServicesModel } from "../models/servicesModel";
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
}

const functions = new Functions();
export default functions;
