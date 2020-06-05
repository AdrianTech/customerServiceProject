import Auth from "../middleware/auth";
import ClientController from "../controllers/client/ClientController";
import Services from "../controllers/client/Services";

export default class ClientRouter {
  private ClientController: ClientController = new ClientController();
  private Services: Services = new Services();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { addNewClient, sendClientData, createNote, deleteNote, deleteClient, updateClient, sendEmail } = this.ClientController;
    const { clientServiceUpdate, extendService, closeService } = this.Services;
    const { checkTokenPost } = this.auth;
    app.get("/getClients", checkTokenPost, sendClientData);
    app.post("/createClient", checkTokenPost, addNewClient);
    app.post("/clientServiceUpdate", checkTokenPost, clientServiceUpdate);
    app.post("/createNote", checkTokenPost, createNote);
    app.post("/deleteNote", checkTokenPost, deleteNote);
    app.post("/sendEmail", checkTokenPost, sendEmail);
    app.delete("/deleteClient", checkTokenPost, deleteClient);
    app.put("/updateClient", checkTokenPost, updateClient);
    app.put("/extendService", checkTokenPost, extendService);
    app.put("/clients/services/close", checkTokenPost, closeService);
  }
}
