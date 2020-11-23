import express from "express";
import bodyParser from "body-parser";
import ClientRoute from "./routes/clients";
import UserRoute from "./routes/user";
import ServiceRoute from "./routes/service";
import SettingsRoute from "./routes/settings";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import history from "connect-history-api-fallback";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Request, Response } from "express";
import SettingsModel from "./models/settingsModel";
import cronJob from "./utils/cronJob";
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
    this.setEmailNotifications();
    this.handleWrongRequest();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(history());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet.hidePoweredBy({ setTo: "None" }));
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"), next();
    });
  }
  private async setEmailNotifications() {
    const data: any = await SettingsModel.find();
    data[0].emailNotifications && cronJob.clientChecker();
  }
  private handleWrongRequest() {
    this.app.get("*", async (req: Request, res: Response) => {
      res.send("<h2>Nothing Found</h2>");
    });
  }

  private dbSetup(): void {
    const DBSetup: string = <string>process.env.DB_SETUP;
    mongoose.connect(DBSetup, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  }
}

export default new App().app;
