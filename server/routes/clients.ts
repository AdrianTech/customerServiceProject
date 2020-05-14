import Auth from "../middleware/auth";
import ClientController from "../controllers/ClientController";

export default class ClientRouter {
  private ClientController: ClientController = new ClientController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { addNewClient, sendClientData, clientServiceUpdate, createNote, deleteNote, deleteClient, updateClient, extendService } = this.ClientController;
    const { checkTokenPost } = this.auth;
    app.post("/createClient", checkTokenPost, addNewClient);
    app.get("/getClients", checkTokenPost, sendClientData);
    app.post("/clientServiceUpdate", checkTokenPost, clientServiceUpdate);
    app.post("/createNote", checkTokenPost, createNote);
    app.post("/deleteNote", checkTokenPost, deleteNote);
    app.delete("/deleteClient", checkTokenPost, deleteClient);
    app.put("/updateClient", checkTokenPost, updateClient);
    app.put("/extendService", checkTokenPost, extendService);
  }
}
