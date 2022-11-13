import {
  IListMovieResponse,
  ListMovieUseCase,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../app";

class ListMovieController {
  constructor(private _createMovieUseCase: ListMovieUseCase) {}

  async execute(_: Request): Promise<IListMovieResponse> {
    const result = await this._createMovieUseCase.list();
    return {
      statusCode: result.statusCode,
      message: result.message,
      movies: result.movies,
    };
  }
}

export default ListMovieController;
