import { IServices } from "../../types/types";
import TimeHandler from "../../utils/timeHandler";
import ClientModel from "../../models/clientModel";
import functions from "../../utils/functions";
import queries from "../../utils/queries";
import { Request, Response } from "express";
import moment from "moment-timezone";
export default class Services {
  public async clientServiceUpdate(req: Request, res: Response) {
    const { id, currentClientsPage, filtered } = req.body;
    filtered.forEach((i: IServices) => {
      new TimeHandler().timeChecker(i);
      i.totalPrice = functions.totalPriceHelper(i);
      delete i.createdDate;
      delete i.__v;
      return i;
    });
    try {
      const doc: any = await ClientModel.findOne({ _id: id });
      doc.typeOfService = functions.sorted([...doc.typeOfService, ...filtered]);
      doc.totalIncome = functions.totalIncomeHelper(doc.typeOfService);
      const client = await doc.save();
      const response = await queries.getNumberOfClients(currentClientsPage, client);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async extendService(req: Request, res: Response) {
    const { clientID, serviceID, value, currentClientsPage } = req.body;
    try {
      const doc: any = await ClientModel.findOne({ _id: clientID });
      const find = doc.typeOfService.find((i: any) => i.id === serviceID);
      const time = moment(find.finishTime).add(value, "months").format();
      find.finishTime = time;
      find.extendTimes += 1;
      //Errors with old data!!!
      find.totalPrice = functions.totalPriceHelper(find);
      doc.totalIncome = functions.totalIncomeHelper(doc.typeOfService);
      doc.typeOfService = functions.sorted(doc.typeOfService);
      const client = await doc.save();
      const response = await queries.getNumberOfClients(currentClientsPage, client);
      res.status(200).json(response);
    } catch (e) {
      return res.status(400).json("Error");
    }
  }
  public async closeService(req: Request, res: Response) {
    const { userid, serviceid, page } = req.query;
    // Note: pushing object with the same id might cause an error, when items will be map!
    try {
      const client: any = await ClientModel.findOne({ _id: userid });
      const service = client.typeOfService.find((i: any) => i.id === serviceid);
      service.closed = moment().format();
      service.active = false;
      client.servicesHistory.push(service);
      client.typeOfService = client.typeOfService.filter((i: any) => i.id !== serviceid);
      client.typeOfService = functions.sorted(client.typeOfService);
      service.totalPrice = functions.totalPriceHelper(service);
      client.totalIncome = functions.totalIncomeHelper(client.typeOfService);
      const clientData = await client.save();
      const response = await queries.getNumberOfClients(page, clientData);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
}
