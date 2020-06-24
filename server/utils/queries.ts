import ClientModel from "../models/clientModel";

class Queries {
  public async getNumberOfClients(page: string): Promise<object | boolean> {
    const currentPage = parseInt(page) * 10 - 10 || 0;
    try {
      const numberOfDocuments = await ClientModel.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / 10);
      const clients = await ClientModel.find()
        .sort({ "typeOfService.0.finishTime": 1 })
        .skip(currentPage)
        .limit(10);
      return {
        clients,
        meta: {
          last_page: numberOfPages,
          documents: numberOfDocuments,
          current_page: page
        }
      };
    } catch (e) {
      return false;
    }
  }
}

const queries = new Queries();
export default queries;
