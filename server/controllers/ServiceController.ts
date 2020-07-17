import { Request, Response } from "express";
import { Services } from "../models/servicesModel";
import mongoose from "mongoose";
const ServicesModel = mongoose.model("services", Services);
import moment from "moment-timezone";

export default class ServiceController {
  public async createService(req: Request, res: Response) {
    const { unitPrice, name, months } = req.body;
    const data = {
      unitPrice,
      name,
      months,
      createdDate: moment().tz("Europe/Warsaw").format(),
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
  public async getServices(req: Request, res: Response): Promise<Response> {
    const data = await ServicesModel.find();
    return res.status(200).json(data);
  }
  public async deleteService(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;
    try {
      await ServicesModel.deleteOne({ _id: id });
      const data = await ServicesModel.find();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json("Something went wrong");
    }
  }
  public async updateService(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    try {
      await ServicesModel.updateOne({ _id: id }, req.body);
      const data = await ServicesModel.find();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json("Something went wrong");
    }
  }
}
