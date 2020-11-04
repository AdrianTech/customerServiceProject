import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const KEY: string = <string>process.env.KEY;
class Auth {
  async checkTokenPost(req: express.Request, res: express.Response, next: express.NextFunction) {
    // if (req.secure) {
    //   // request was via https, so do no special handling
    // } else {
    //   // request was via http, so redirect to https
    //   res.redirect("https://" + req.headers.host + req.url);
    // }
    if (req.method === "POST") {
      if (Object.keys(req.body).length === 0) return res.status(400).json("Bad request");
    }
    const auth = req.cookies.Auth;
    if (!auth) return res.status(401).json("Unauthorized");
    try {
      jwt.verify(auth, KEY);
    } catch (err) {
      return res.status(401).json("Unauthorized");
    }
    next();
  }
  async checkPermission(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.cookies.Auth;
    const { role }: any = jwt.verify(auth, KEY);
    if (role !== "admin") return res.status(403).json("Forbridden");
    next();
  }
}
export default Auth;
