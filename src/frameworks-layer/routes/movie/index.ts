import { Application } from "../../app";
import CreateMovieRoute from "./create";
import ListMovieRoute from "./list";

class MovieRoutes {
  private _express: Application;
  private _baseUrl = "/movie";

  constructor(expressApplication: Application) {
    this._express = expressApplication;
    this.routes();
  }

  routes() {
    new CreateMovieRoute(this._express, this._baseUrl);
    new ListMovieRoute(this._express, this._baseUrl);
  }
}

export default MovieRoutes;
