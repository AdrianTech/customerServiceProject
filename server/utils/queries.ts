import ClientModel from "../schemes/clientModel";
import uniqBy from "lodash.uniqby";

class Queries {
  public async getNumberOfClients(page: string, client?: any): Promise<object | boolean> {
    const currentPageSkip = parseInt(page) * 10 - 10 || 0;
    const currentPage = +page;
    try {
      let clientsList;
      const numberOfDocuments = await ClientModel.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / 10);
      const data = await ClientModel.find().sort({ "typeOfService.0.finishTime": 1 }).skip(currentPageSkip).limit(10);
      if (client !== undefined) {
        clientsList = data.find((i) => i._id === client._id);
        !clientsList && data.push(client);
      }
      const clients = uniqBy(data, "id");
      return {
        clients,
        meta: {
          last_page: numberOfPages,
          next_page: currentPage < numberOfPages ? currentPage + 1 : currentPage,
          isNextPage: currentPage < numberOfPages ? true : false,
          prev_page: currentPage > 1 ? currentPage - 1 : currentPage,
          isPreviousPage: currentPage === 1 ? false : true,
          documents: numberOfDocuments,
          current_page: currentPage,
        },
      };
    } catch (e) {
      return false;
    }
  }
}

const queries = new Queries();
export default queries;
