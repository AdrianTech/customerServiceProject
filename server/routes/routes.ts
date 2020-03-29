import Auth from "../middleware/auth";
import ClientController from "../controllers/ClientController";
import UserController from "../controllers/UserController";

export class Routes {
  ClientController: ClientController = new ClientController();
  UserController: UserController = new UserController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { addNewClient, sendClientData } = this.ClientController;
    const { userLogin, logout } = this.UserController;
    app.get("/getClients", this.auth.checkToken, sendClientData);
    app.post("/createClient", addNewClient);
    app.post("/loginUser", userLogin);
    app.get("/logout", logout);
  }
}
