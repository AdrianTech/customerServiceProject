import ClientModel from "../models/clientModel";
import uniqBy from "lodash.uniqby";

class Queries {
  public async getNumberOfClients(
    page: string,
    client?: any,
  ): Promise<object | boolean> {
    const currentPage = parseInt(page) * 10 - 10 || 0;
    try {
      let clientsList;
      const numberOfDocuments = await ClientModel.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / 10);
      const data = await ClientModel.find()
        .sort({ "typeOfService.0.finishTime": 1 })
        .skip(currentPage)
        .limit(10);
      if (client !== undefined) {
        clientsList = data.find((i) => i._id === client._id);
        !clientsList && data.push(client);
      }
      const clients = uniqBy(data, "id");
      return {
        clients,
        meta: {
          last_page: numberOfPages,
          documents: numberOfDocuments,
          current_page: page,
        },
      };
    } catch (e) {
      return false;
    }
  }
}

const queries = new Queries();
export default queries;
