import moment from "moment-timezone";
export default function displayTimeCounter(endTime) {
  const guess = moment.tz.guess();
  const time = moment(endTime)
    .clone()
    .tz(guess);
  const now = time.diff(new Date(), "days");
  return now;
}
