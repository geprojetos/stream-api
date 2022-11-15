import { Application } from "../../app";
import { logger } from "../../../adapters-layer/utils/logger";

class DashboardRoutes {
  private express: Application;

  constructor(expressApplication: Application) {
    this.express = expressApplication;
    this.main();
  }

  private main() {
    this.express.get("/", async (req, res) => {
      return res.send({ message: "Welcome stream api" });
    });
  }
}

export default DashboardRoutes;
