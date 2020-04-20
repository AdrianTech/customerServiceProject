import Auth from "../middleware/auth";
import UserController from "../controllers/UserController";

export default class ClientRouter {
  UserController: UserController = new UserController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { userLogin, logout } = this.UserController;
    const { checkTokenPost } = this.auth;
    app.post("/loginUser", userLogin);
    app.get("/logout", checkTokenPost, logout);
  }
}
