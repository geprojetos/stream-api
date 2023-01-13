import { Application } from "../../../app";
import { createMoviePresentation } from "../../../../adapters-layer/presentation/";

class MovieRoutes {
  private express: Application;
  private _baseUrl: string;

  constructor(expressApplication: Application, baseUrl: string) {
    this.express = expressApplication;
    this._baseUrl = baseUrl;
    this.create();
  }

  private create() {
    this.express.post(`${this._baseUrl}`, async (request, response) => {
      const result = await createMoviePresentation.execute(request);
      return response.send(result);
    });
  }
}

export default MovieRoutes;
