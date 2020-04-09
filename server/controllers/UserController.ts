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

export default class UseController {
  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json("Not found");
    const match = await bcrypt.compare(password, user.password);
    const payload = {
      user: user.id
    };
    let cookieOptions = {
      maxAge: 1000 * 60 * 60 * 12
    };
    const auth = jwt.sign(payload, KEY, { expiresIn: "12h" });
    if (!match) return res.status(404).json("Wrong password or email");
    else {
      const userRes = {
        id: user._id,
        email
      };
      res.cookie("Auth", auth, cookieOptions);
      return res.status(200).json(userRes);
    }
  }
  public logout(req: Request, res: Response) {
    res.clearCookie("Auth");
    res.status(200).json("You've been logged out");
  }
}
