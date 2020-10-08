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
import userModel from "../models/userModel";

export default class UseController {
  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json("Not found");
    const match = await bcrypt.compare(password, user.password);
    const payload = {
      user: user.id,
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
}
