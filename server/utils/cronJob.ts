import moment from "moment-timezone";
import ClientModel from "../models/clientModel";
import { IClient, IServices } from "../types/types";
import { ranges } from "../utils/config";
import emailHandler from "./emailHandler";
import { hTMLEmailHelper } from "./cronJobHelper";
var Cron_Job = require("cron").CronJob;
class CronJob {
  public async clientChecker() {
    const job = new Cron_Job(
      "00 19 * * *",
      () => {
        this.clientDataHelper();
      },
      null,
      true,
      "Europe/Warsaw"
    );
    job.start();
  }
  public async clientDataHelper() {
    const clients: Array<IClient> = await ClientModel.find().lean();
    const last_day = this.sortServices(clients, ranges.last_day).sort((a: any, b: any) => this.sortClients(a.typeOfService[0], b.typeOfService[0]));
    const last_7days: any = this.sortServices(clients, ranges.last_7days).sort((a: any, b: any) => this.sortClients(a.typeOfService[0], b.typeOfService[0]));
    const last_14days = this.sortServices(clients, ranges.last_14days).sort((a: any, b: any) => this.sortClients(a.typeOfService[0], b.typeOfService[0]));
    if ([last_day, last_7days, last_14days].filter((i) => i.length !== 0 && i).length === 0) return;
    const html = hTMLEmailHelper({ last_day, last_7days, last_14days });
    emailHandler.sendEmail({ email: "mojofw@gmail.com", html });
  }
  private sortClients(a: IServices, b: IServices) {
    return <any>new Date(a.finishTime) - <any>new Date(b.finishTime);
  }
  private sortServices(clients: Array<IClient>, range: number) {
    return clients
      .map((client: IClient) => ({
        ...client,
        typeOfService: this.filtered(client, range),
      }))
      .filter((i: any) => i.typeOfService.length > 0);
  }
  private filtered(client: IClient, range: number) {
    return client.typeOfService.filter((item: IServices) => moment(item.finishTime).diff(new Date(), "days") === range).sort((a: any, b: any) => this.sortClients(a, b));
  }
}
const cronJob = new CronJob();
export default cronJob;
