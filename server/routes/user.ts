import Auth from "../middleware/auth";
import UserController from "../controllers/UserController";

export default class ClientRouter {
  UserController: UserController = new UserController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { userLogin, logout, search, update } = this.UserController;
    const { checkTokenPost } = this.auth;
    app.post("/login", userLogin);
    app.get("/logout", checkTokenPost, logout);
    app.get("/search", checkTokenPost, search);
    app.post("/user", checkTokenPost, update);
  }
}
