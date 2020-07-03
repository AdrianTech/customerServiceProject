import ClientModel from "../../models/clientModel";
import TimeHandler from "../../utils/timeHandler";
import emailHandler from "../../utils/emailHandler";
import functions from "../../utils/functions";
import queries from "../../utils/queries";
import moment from "moment-timezone";
import { IServices } from "../../types/types";
import { Request, Response } from "express";

export default class ClientCotroller {
  public async addNewClient(req: Request, res: Response) {
    const { fullname, email, clientArr, phone, page } = req.body;
    clientArr.forEach((item: IServices) => {
      new TimeHandler().timeChecker(item);
      delete item.__v;
      delete item.createdDate;
      return item;
    });
    const sorted = functions.sorted(clientArr);
    const newClient = {
      fullname,
      email,
      typeOfService: sorted,
      phone,
      notes: [],
      registerDate: moment().format()
    };
    try {
      await new ClientModel(newClient).save();
      const response = await queries.getNumberOfClients(page);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong");
    }
  }
  public async sendClientData(req: Request, res: Response) {
    const { page } = req.query;
    const data = await queries.getNumberOfClients(page);
    res.status(200).json(data);
  }
  public async createNote(req: Request, res: Response) {
    const { id, body, page } = req.body;
    const data = {
      body,
      date: moment().format()
    };
    try {
      await ClientModel.updateOne({ _id: id }, { $addToSet: { notes: data } });
      const response = await queries.getNumberOfClients(page);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async deleteNote(req: Request, res: Response) {
    const { id, messageID, page } = req.body;
    try {
      await ClientModel.update({ _id: id }, { $pull: { notes: { _id: messageID } } });
      const response = await queries.getNumberOfClients(page);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async deleteClient(req: Request, res: Response) {
    const { id, page } = req.query;
    try {
      await ClientModel.findOneAndDelete({ _id: id });
      const response = await queries.getNumberOfClients(page);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async updateClient(req: Request, res: Response) {
    const { id, page } = req.body;
    try {
      await ClientModel.updateOne({ _id: id }, { $set: req.body });
      const response = await queries.getNumberOfClients(page);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async sendEmail(req: Request, res: Response) {
    const { message, email } = req.body;
    try {
      await emailHandler.sendEmailToClient({ message, email });
      res.status(200).json("Email sent");
    } catch (e) {
      res.status(400).json("Email wasn't sent. Check the email name");
    }
  }
}