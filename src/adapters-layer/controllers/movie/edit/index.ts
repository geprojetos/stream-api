import {
  EditMovieUseCase,
  IEditMovieResponse,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../frameworks-layer/app";

class EditMovieController {
  constructor(private _editMovieUseCase: EditMovieUseCase) {}

  async execute(_: Request): Promise<IEditMovieResponse> {
    const result = await this._editMovieUseCase.list();
    return {
      statusCode: result.statusCode,
      message: result.message,
      movies: result.movies,
    };
  }
}

export default EditMovieController;
