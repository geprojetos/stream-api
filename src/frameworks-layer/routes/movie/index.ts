import { Application } from "../../app";
import Create from "./create";
import Edit from "./edit";
import List from "./list";
import Delete from "./delete";

class MovieRoutes {
  private _express: Application;
  private _baseUrl = "/movie";

  constructor(expressApplication: Application) {
    this._express = expressApplication;
    this.routes();
  }

  routes() {
    new Create(this._express, this._baseUrl);
    new List(this._express, this._baseUrl);
    new Edit(this._express, this._baseUrl);
    new Delete(this._express, this._baseUrl);
  }
}

export default MovieRoutes;
