import { Application } from "../../../../app";
import { listMoviePresentation } from "../../../../adapters-layer/presentation/";

class MovieRoutes {
  private _express: Application;
  private _baseUrl: string;

  constructor(expressApplication: Application, baseUrl: string) {
    this._express = expressApplication;
    this._baseUrl = baseUrl;
    this.route();
  }

  private route() {
    this._express.get(`${this._baseUrl}/list`, async (request, response) => {
      const result = await listMoviePresentation.execute(request);
      return response.send(result);
    });
  }
}

export default MovieRoutes;
