import ClientModel from "../../models/clientModel";
import TimeHandler from "../../utils/timeHandler";
import emailHandler from "../../utils/emailHandler";
import functions from "../../utils/functions";
import queries from "../../utils/queries";
import moment from "moment-timezone";
import { IServices } from "../../types/types";
import { Request, Response } from "express";

export default class ClientController {
  public async addNewClient(req: Request, res: Response) {
    const { fullname, email, clientArr, phone, page } = req.body;
    clientArr.forEach((item: IServices) => {
      new TimeHandler().timeChecker(item);
      item.totalPrice = functions.totalPriceHelper(item);
      delete item.__v;
      delete item.createdDate;
      return item;
    });
    const sorted = functions.sorted(clientArr);
    const newClient = {
      fullname,
      email,
      totalIncome: functions.totalIncomeHelper(clientArr),
      typeOfService: sorted,
      phone,
      notes: [],
      registerDate: moment().format(),
    };
    try {
      await new ClientModel(newClient).save();
      const response = await queries.getNumberOfClients(page);
      res.status(201).json(response);
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
    const { id, body, currentClientsPage } = req.body;
    const data = {
      body,
      date: moment().format(),
    };
    try {
      const client = await ClientModel.findOneAndUpdate({ _id: id }, { $addToSet: { notes: data } }, { new: true });
      const response = await queries.getNumberOfClients(currentClientsPage, client);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async deleteNote(req: Request, res: Response) {
    const { id, messageID, page } = req.body;
    try {
      const updated = await ClientModel.findByIdAndUpdate({ _id: id }, { $pull: { notes: { _id: messageID } } }, { new: true });
      const response = await queries.getNumberOfClients(page, updated);
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
    // check req.body, everything is in one object, when is pass to $set operator
    try {
      const updateClient = await ClientModel.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
      const response = await queries.getNumberOfClients(page, updateClient);
      res.status(200).json(response);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async sendEmail(req: Request, res: Response) {
    const { message, email } = req.body;
    const html = `<h2>${message}</h2>`;
    try {
      await emailHandler.sendEmail({ html, email });
      res.status(200).json("Email sent");
    } catch (e) {
      res.status(400).json("Email wasn't sent. Check the email name");
    }
  }
}
