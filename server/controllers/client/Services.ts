import { IServices } from "../../types/types";
import TimeHandler from "../../utils/timeHandler";
import ClientModel from "../../models/clientModel";
import functions from "../../utils/functions";
import queries from "../../utils/queries";
import { Request, Response } from "express";
import moment from "moment-timezone";
export default class Services {
  public async clientServiceUpdate(req: Request, res: Response) {
    const { id, page, filtered } = req.body;
    filtered.forEach((i: IServices) => {
      new TimeHandler().timeChecker(i);
      delete i.createdDate;
      delete i.__v;
      return i;
    });
    try {
      const doc: any = await ClientModel.findOne({ _id: id });
      doc.typeOfService = functions.sorted([...doc.typeOfService, ...filtered]);
      const client = await doc.save();
      const response = await queries.getNumberOfClients(page, client);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async extendService(req: Request, res: Response) {
    const { clientID, serviceID, value, page } = req.body;
    try {
      const doc: any = await ClientModel.findOne({ _id: clientID });
      const find = doc.typeOfService.find((i: any) => i.id === serviceID);
      const time = moment(find.finishTime).add(value, "months").format();
      find.finishTime = time;
      find.extendTimes += 1;
      doc.typeOfService = functions.sorted(doc.typeOfService);
      const client = await doc.save();
      const response = await queries.getNumberOfClients(page, client);
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
      const clientData = await client.save();
      const response = await queries.getNumberOfClients(page, clientData);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
}
