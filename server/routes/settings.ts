import Auth from "../middleware/auth";
import SettingsController from "../controllers/SettingsController";

export default class AppSettings {
  SettingsController: SettingsController = new SettingsController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { enableNotification, getSettings } = this.SettingsController;
    const { checkTokenPost, checkPermission } = this.auth;
    app.post("/application/settings", [checkPermission, checkTokenPost], enableNotification);
    app.get("/application/settings", checkTokenPost, getSettings);
  }
}
