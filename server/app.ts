import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);
dotenv.config();

class App {
  public app: express.Application;
  public route: Routes = new Routes();
  public serviceRoute: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.route.routes(this.app);
    this.serviceRoute.routes(this.app);
    this.dbSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet.hidePoweredBy({ setTo: "None" }));
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"), next();
    });
    // this.app.use(helmet.hidePoweredBy());
  }

  private dbSetup(): void {
    const DBSetup: string = <string>process.env.DB_SETUP;
    mongoose.connect(DBSetup, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
      console.log("DB connected")
    );
  }
}

export default new App().app;
