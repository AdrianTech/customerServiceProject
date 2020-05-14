import ClientModel from "../models/clientModel";
import TimeHandler from "../utils/timeHandler";
import moment from "moment-timezone";
import { IServices } from "../types/types";
import { Request, Response } from "express";

export default class ClientCotroller {
  public async addNewClient(req: Request, res: Response) {
    const { fullname, email, clientArr, phone } = req.body;
    clientArr.forEach((item: IServices) => {
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
    filtered.forEach((i: IServices) => {
      new TimeHandler().timeChecker(i);
      delete i.createdDate;
      delete i.__v;
      return i;
    });
    try {
      await ClientModel.updateOne({ _id: id }, { $addToSet: { typeOfService: filtered } });
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async createNote(req: Request, res: Response) {
    const { id, body } = req.body;
    const data = {
      body,
      date: moment()
        .tz("Europe/Warsaw")
        .format()
    };
    try {
      await ClientModel.updateOne({ _id: id }, { $addToSet: { notes: data } });
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async deleteNote(req: Request, res: Response) {
    const { id, messageID } = req.body;
    try {
      await ClientModel.update({ _id: id }, { $pull: { notes: { _id: messageID } } });
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async deleteClient(req: Request, res: Response) {
    const { id } = req.query;
    try {
      await ClientModel.findOneAndDelete({ _id: id });
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async updateClient(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await ClientModel.updateOne({ _id: id }, { $set: req.body });
      const updateClientData = await ClientModel.find();
      res.status(200).json(updateClientData);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async extendService(req: Request, res: Response) {
    const { clientID, serviceID, value } = req.body;
    // let client: any;
    // client = await ClientModel.findOne({ _id: clientID });
    ClientModel.findOne({ _id: clientID })
      .then(async (doc: any) => {
        let find = doc.typeOfService.find((i: any) => i.id === serviceID);
        console.log(find.name);
        const time = moment(find.finishTime)
          .add(value, "months")
          .format();
        find.finishTime = time;
        find.extendTimes++;
        console.log(time);
        doc.save();
        const data = await ClientModel.find();
        res.status(200).json(data);
      })
      .catch(() => res.status(400));
    // try {
    //   const updateClientData = await ClientModel.find();
    //   res.status(200).json(updateClientData);
    // } catch (e) {
    //   res.status(400).json("Something went wrong");
    // }
    // res.status(200);
  }
}
