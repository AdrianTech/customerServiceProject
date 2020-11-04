import Auth from "../middleware/auth";
import UserController from "../controllers/UserController";

export default class ClientRouter {
  UserController: UserController = new UserController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { userLogin, logout, search, update, allUsers, createNewUser, setUserFirstPassword, remove, updateByAdmin, forgotPassword, allClients } = this.UserController;
    const { checkTokenPost, checkPermission } = this.auth;
    app.post("/login", userLogin);
    app.get("/logout", checkTokenPost, logout);
    app.get("/users/clients", [checkPermission, checkTokenPost], allClients);
    app.get("/search", checkTokenPost, search);
    app.get("/users", [checkPermission, checkTokenPost], allUsers);
    app.post("/users", checkTokenPost, update);
    app.post("/users/create", [checkPermission, checkTokenPost], createNewUser);
    app.post("/users/set_password", checkTokenPost, setUserFirstPassword);
    app.post("/users/update", [checkPermission, checkTokenPost], updateByAdmin);
    app.post("/users/forgot_password", forgotPassword);
    app.delete("/users", checkTokenPost, remove);
  }
}
