import moment from "moment-timezone";
export default function displayTimeCounter(endTime) {
  const guess = moment.tz.guess();
  const time = moment(endTime)
    .clone()
    .tz(guess);
  const now = time.diff(new Date(), "days");
  return now;
}
export const timeChecker = item => {
  const now = moment.tz(new Date(), "Europe/Warsaw");
  (item.startTime = now.format()), (item.finishTime = now.add(item.months, "months").format());
  return item;
};
