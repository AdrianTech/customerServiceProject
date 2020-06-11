import Auth from "../middleware/auth";
import ServiceController from "../controllers/ServiceController";

export default class ClientRouter {
  ServiceController: ServiceController = new ServiceController();
  private auth: Auth = new Auth();
  public routes(app: any): void {
    const { createService, getServices, deleteService, updateService } = this.ServiceController;
    const { checkTokenPost } = this.auth;
    app.get("/services", checkTokenPost, getServices);
    app.post("/createService", checkTokenPost, createService);
    app.delete("/removeService", checkTokenPost, deleteService);
    app.put("/updateService", checkTokenPost, updateService);
  }
}
