import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import DashboardRoutes from "../routes/dashboard";
import MovieRoutes from "../routes/movie";

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.initialize();
  }

  private initialize() {
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.express.use(json());
    this.express.use(cors());
  }

  private routes() {
    new DashboardRoutes(this.express);
    new MovieRoutes(this.express);
  }
}

export default new App().express;
export { Request, Response, Application };
