import mongoose from "mongoose";
import ClientMoongooseModel from "../models/clientModel";
const ClientModel = mongoose.model("clients", ClientMoongooseModel);
import TimeHandler from "../utils/timeHandler";
import { IServices } from "../types/types";
import { Request, Response } from "express";

export default class ClientCotroller {
  public addNewClient(req: Request, res: Response) {
    const { typeOfService } = req.body;
    typeOfService.forEach((item: IServices) => {
      let time = new TimeHandler().timeChecker(item);
      item.active = true;
      return time;
    });
    let newClient = new ClientModel(req.body);
    newClient.save((err, data) => {
      if (err) {
        res.json("Something went wrong");
      }
      res.json("New client added");
    });
  }
  public async sendClientData(req: Request, res: Response) {
    const data = await ClientModel.find();
    res.status(200).json(data);
  }
}
