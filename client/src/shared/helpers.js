export const filterClientsByTime = (clients, days) => {
  const fromTime = new Date().getTime() - days * 24 * 60 * 60 * 1000;
  let arr = [];
  clients.forEach((client) =>
    client.typeOfService.forEach((service) => {
      if (new Date(service.startTime).getTime() >= fromTime) arr.push([new Date(service.startTime).getTime(), service.months * 3]);
    })
  );
  return arr;
};
