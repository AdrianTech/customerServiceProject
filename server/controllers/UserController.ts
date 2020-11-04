import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const KEY: string = <string>process.env.KEY;
import model from "../models/userModel";
import { IUser } from "../types/types";
const UserModel = mongoose.model<IUser>("users", model);
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import functions from "../utils/functions";
import { cookieOptions } from "../utils/config";
import emailHandler from "../utils/emailHandler";
import ClientModel from "../models/clientModel";
import cronJob from "../utils/cronJob";
import userModel from "../models/userModel";

export default class UseController {
  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json("Not found");
    else if (!user.isActive) return res.status(403).json("Your account is not active now. Please set up your password first");
    const match = await bcrypt.compare(password, user.password);
    const payload = {
      user: user.id,
      role: user.role,
    };
    const auth = jwt.sign(payload, KEY, { expiresIn: "2h" });
    if (!match) return res.status(404).json("Wrong password or email");
    else {
      const userRes = {
        _id: user._id,
        email,
        role: user.role,
        loginname: user.loginname,
      };
      res.cookie("Auth", auth, cookieOptions);
      return res.status(200).json(userRes);
    }
  }
  public async allUsers(req: Request, res: Response) {
    const all = await UserModel.find().select("-password");
    res.status(200).json(all);
  }
  public async allClients(req: Request, res: Response) {
    try {
      const clients = await ClientModel.find();
      res.status(200).json(clients);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public logout(req: Request, res: Response) {
    res.clearCookie("Auth");
    res.status(200).json("You've been logged out");
  }

  public async search(req: Request, res: Response) {
    const { value, option } = req.query;
    try {
      const result = await functions.searchHelper(option, value);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  }
  public async update(req: Request, res: Response) {
    const { id, password } = req.body;
    let data = req.body;
    delete data.id;
    if (password) {
      const hash = bcrypt.hashSync(password, 10);
      data.password = hash;
    }
    try {
      const updated = await UserModel.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }).select("-password");
      res.status(200).json(updated);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async createNewUser(req: Request, res: Response) {
    const { sendEmail, email } = req.body;
    try {
      const user = await UserModel.create(req.body);
      if (sendEmail) {
        const html = functions.createEmailHtml(user, "Your account was created. Now click the button and set up your password");
        emailHandler.sendEmail({ email, html });
      }
      const data = await UserModel.find().select("-password");
      res.status(201).json(data);
    } catch (e) {
      if (e.code === 11000) res.status(400).json("This email already exist");
      else res.status(400).json("Something went wrong");
    }
  }
  public async setUserFirstPassword(req: Request, res: Response) {
    const { id, password } = req.body;
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new Error("Not found");
      const hash = bcrypt.hashSync(password, 10);
      user.password = hash;
      user.isActive = true;
      await user.save();
      res.status(200).json("Ok. Now just log in");
    } catch (e) {
      res.status(404).json(e.message);
    }
  }
  public async remove(req: Request, res: Response) {
    const { id } = req.query;
    try {
      await UserModel.deleteOne({ _id: id });
      const data = await UserModel.find().select("-password");
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async updateByAdmin(req: Request, res: Response) {
    const { id } = req.body;
    const userData = req.body;
    delete userData.id;
    try {
      await UserModel.update({ _id: id }, { $set: userData });
      const data = await UserModel.find().select("-password");
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json("Something went wrong");
    }
  }
  public async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      if (!email || email.length < 5) throw new Error("Invalid email");
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("This email doesn't exist");
      const html = functions.createEmailHtml(user, "Click the button and change the password");
      emailHandler.sendEmail({ email, html });
      res.status(200).json("ok");
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}
