import ClientModel from "../models/clientModel";
import TimeHandler from "../utils/timeHandler";
import moment from "moment-timezone";
import { IServices, ICompanyServices } from "../types/types";
import { Request, Response } from "express";

export default class ClientCotroller {
  public async addNewClient(req: Request, res: Response) {
    const { fullname, email, clientArr, phone } = req.body;
    clientArr.forEach((item: any) => {
      new TimeHandler().timeChecker(item);
      delete item.__v;
      delete item.createdDate;
      return item;
    });
    const newClient = {
      fullname,
      email,
      typeOfService: clientArr,
      phone,
      notes: [],
      registerDate: moment()
        .tz("Europe/Warsaw")
        .format()
    };
    try {
      await new ClientModel(newClient).save();
      const data = await ClientModel.find();
      res.status(200).json({ msg: "New client added", data });
    } catch (err) {
      res.status(400).json("Something went wrong");
    }
  }
  public async sendClientData(req: Request, res: Response) {
    const data = await ClientModel.find();
    res.status(200).json(data);
  }
  public async clientServiceUpdate(req: Request, res: Response) {
    const { id } = req.body;
    const { filtered } = req.body;
    filtered.forEach((i: any) => {
      new TimeHandler().timeChecker(i);
      delete i.createdDate;
      delete i.__v;
      return i;
    });
    console.log(filtered);
    try {
      const response = await ClientModel.findOneAndUpdate(
        { _id: id },
        { $addToSet: { typeOfService: filtered } }
      );
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
}
