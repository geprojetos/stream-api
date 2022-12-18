import { Application } from "../../../app";
import { editMoviePresentation } from "../../../../adapters-layer/presentation/";

class Edit {
  private _express: Application;
  private _baseUrl: string;

  constructor(expressApplication: Application, baseUrl: string) {
    this._express = expressApplication;
    this._baseUrl = baseUrl;
    this.route();
  }

  private route() {
    this._express.patch(`${this._baseUrl}/edit`, async (request, response) => {
      const result = await editMoviePresentation.execute(request);
      return response.send(result);
    });
  }
}

export default Edit;
