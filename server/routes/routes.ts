import Auth from "../middleware/auth";
import ClientController from "../controllers/ClientController";
import UserController from "../controllers/UserController";
import ServiceController from "../controllers/ServiceController";

export class Routes {
  ClientController: ClientController = new ClientController();
  UserController: UserController = new UserController();
  ServiceController: ServiceController = new ServiceController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { addNewClient, sendClientData, clientServiceUpdate } = this.ClientController;
    const { userLogin, logout } = this.UserController;
    const { createService, getServices } = this.ServiceController;
    app.post("/createClient", this.auth.checkTokenPost, addNewClient);
    app.get("/getClients", this.auth.checkTokenPost, sendClientData);
    app.get("/getServices", this.auth.checkTokenPost, getServices);
    app.post("/createService", this.auth.checkTokenPost, createService);
    app.post("/clientServiceUpdate", this.auth.checkTokenPost, clientServiceUpdate);
    app.post("/loginUser", userLogin);
    app.get("/logout", this.auth.checkTokenPost, logout);
  }
}
