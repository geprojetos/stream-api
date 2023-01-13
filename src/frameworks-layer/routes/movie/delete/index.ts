import { Application } from "../../../app";
import { deleteMoviePresentation } from "../../../../adapters-layer/presentation/";

class Delete {
  private _express: Application;
  private _baseUrl: string;

  constructor(expressApplication: Application, baseUrl: string) {
    this._express = expressApplication;
    this._baseUrl = baseUrl;
    this.route();
  }

  private route() {
    this._express.delete(`${this._baseUrl}`, async (request, response) => {
      const result = await deleteMoviePresentation.execute(request);
      return response.send(result);
    });
  }
}

export default Delete;
