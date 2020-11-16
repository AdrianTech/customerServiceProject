import express from "express";
import bodyParser from "body-parser";
import ClientRoute from "./routes/clients";
import UserRoute from "./routes/user";
import ServiceRoute from "./routes/service";
import SettingsRoute from "./routes/settings";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Request, Response } from "express";
mongoose.set("useFindAndModify", false);
dotenv.config();

class App {
  public app: express.Application;
  public clientRoute: ClientRoute = new ClientRoute();
  public userRoute: UserRoute = new UserRoute();
  public serviceRoute: ServiceRoute = new ServiceRoute();
  public settingsRoute: SettingsRoute = new SettingsRoute();
  constructor() {
    this.app = express();
    this.config();
    this.clientRoute.routes(this.app);
    this.userRoute.routes(this.app);
    this.serviceRoute.routes(this.app);
    this.settingsRoute.routes(this.app);
    this.dbSetup();
    this.handleWrongRequest();
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
  }
  private handleWrongRequest(): void {
    this.app.all("*", (req: Request, res: Response) => {
      res.redirect("/");
    });
  }

  private dbSetup(): void {
    const DBSetup: string = <string>process.env.DB_SETUP;
    mongoose.connect(DBSetup, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  }
}

export default new App().app;
