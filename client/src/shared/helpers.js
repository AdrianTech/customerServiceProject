import moment from "moment-timezone";
export const filterClientsByTime = (clients, days) => {
  const fromTime = new Date().getTime() - days * 24 * 60 * 60 * 1000;
  let arr = [];
  clients.forEach((client) =>
    client.typeOfService.forEach((service) => {
      if (new Date(service.startTime).getTime() >= fromTime) arr.push([moment(service.startTime).format("LLL"), service.totalPrice]);
    })
  );
  return arr;
};
