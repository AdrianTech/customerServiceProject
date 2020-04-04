import { Request, Response } from "express";

export default class ServiceController {
  public createService(req: Request, res: Response) {
    console.log(req.body);
    res.status(201).json("ok");
  }
}
