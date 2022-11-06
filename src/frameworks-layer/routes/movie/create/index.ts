import { Application } from "../../../../app";
import { createMoviePresentation } from "../../../../adapters-layer/presentation/";

class MovieRoutes {
  private express: Application;

  constructor(expressApplication: Application) {
    this.express = expressApplication;
    this.create();
  }

  private create() {
    this.express.post("/create", async (request, response) => {
      const result = await createMoviePresentation.execute(request);
      return response.send(result);
    });
  }
}

export default MovieRoutes;
