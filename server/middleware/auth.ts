import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const KEY: string = <string>process.env.KEY;
class Auth {
  async checkToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.cookies.Auth;
    if (!auth) return res.status(401).json("Unauthorized");
    try {
      const verify = await jwt.verify(auth, KEY);
    } catch (err) {
      return res.status(401).json("Unauthorized");
    }
    next();
  }
}
export default Auth;
