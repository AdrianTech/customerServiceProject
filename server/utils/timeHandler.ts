import moment from "moment-timezone";
import { IServices } from "../types/types";

export default class TimeHandler {
  public timeChecker(item: IServices) {
    const now = moment.tz(new Date(), "Europe/Warsaw");
    (item.startTime = now.format()), (item.finishTime = now.add(item.months, "months").format());
    return item;
  }
}
