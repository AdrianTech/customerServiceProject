import { Request, Response } from "express";
export default class SettingsController {
  public async enableNotification(req: Request, res: Response) {
    console.log(req.body);
  }
}
