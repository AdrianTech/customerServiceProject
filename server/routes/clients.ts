import Auth from "../middleware/auth";
import ClientController from "../controllers/ClientController";

export default class ClientRouter {
  private ClientController: ClientController = new ClientController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { addNewClient, sendClientData, clientServiceUpdate, createNote, deleteNote, deleteClient, updateClient, extendService, sendEmail } = this.ClientController;
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
  }
}
