import { Request, Response } from "express";
import { Services } from "../models/servicesModel";
import mongoose from "mongoose";
const ServicesModel = mongoose.model("services", Services);
import moment from "moment-timezone";

export default class ServiceController {
  public async createService(req: Request, res: Response) {
    if (req.body === "") return res.status(400).json(status);
    const { unitPrice, name } = req.body;
    const data = {
      unitPrice,
      name,
      createdDate: moment()
        .tz("Europe/Warsaw")
        .format()
    };
    const Services = new ServicesModel(data);
    try {
      await Services.save();
      const newData = await ServicesModel.find();
      res.status(200).json(newData);
    } catch (err) {
      res.status(400).json("Something went wrong");
    }
  }
}
