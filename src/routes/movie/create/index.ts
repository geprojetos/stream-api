import { Application } from "../../../app";
import { logger } from "../../../logger";
import { createMoviePresentation } from "../../../presentation/movie/create";

class StreamRoutes {
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

export default StreamRoutes;
