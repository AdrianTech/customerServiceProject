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
    const { addNewClient, sendClientData } = this.ClientController;
    const { userLogin, logout } = this.UserController;
    const { createService } = this.ServiceController;
    app.post("/createClient", addNewClient);
    app.get("/getClients", sendClientData);
    app.post("/createService", this.auth.checkToken, createService);
    app.post("/loginUser", userLogin);
    app.get("/logout", logout);
  }
}
