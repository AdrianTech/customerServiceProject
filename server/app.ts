import express from "express";
import bodyParser from "body-parser";
import ClientRoute from "./routes/clients";
import UserRoute from "./routes/user";
import ServiceRoute from "./routes/service";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);
dotenv.config();

class App {
  public app: express.Application;
  public clientRoute: ClientRoute = new ClientRoute();
  public userRoute: UserRoute = new UserRoute();
  public serviceRoute: ServiceRoute = new ServiceRoute();
  constructor() {
    this.app = express();
    this.config();
    this.clientRoute.routes(this.app);
    this.userRoute.routes(this.app);
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
  }

  private dbSetup(): void {
    const DBSetup: string = <string>process.env.DB_SETUP;
    mongoose.connect(DBSetup, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("DB ready..."));
  }
}

export default new App().app;
