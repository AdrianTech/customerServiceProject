import { Request, Response } from "express";
import SettingsModel from "../models/settingsModel";
import cronJob from "../utils/cronJob";
export default class SettingsController {
  public async enableNotification(req: Request, res: Response) {
    const { value, id } = req.body;
    try {
      const resp: any = await SettingsModel.findOneAndUpdate(id, { emailNotifications: value }, { new: true }).select("-ownerEmail");
      resp.emailNotifications && cronJob.clientChecker();
      res.status(200).json(resp);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async setCurrency(req: Request, res: Response) {
    const { value, id } = req.body;
    try {
      const resp = await SettingsModel.findOneAndUpdate(id, { currency: value }, { new: true }).select("-ownerEmail");
      res.status(200).json(resp);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async getSettings(req: Request, res: Response) {
    try {
      const result = await SettingsModel.find().select("-ownerEmail");
      res.status(200).json(result[0]);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
}
