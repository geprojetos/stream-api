import {
  IDeleteMovieResponse,
  DeleteMovieUseCase,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../frameworks-layer/app";

class DeleteMovieController {
  constructor(private _deleteMovieUseCase: DeleteMovieUseCase) {}

  async execute(request: Request): Promise<IDeleteMovieResponse> {
    const { id } = request.body;
    const result = await this._deleteMovieUseCase.delete(id);
    return {
      statusCode: result.statusCode,
      message: result.message,
      id,
    };
  }
}

export default DeleteMovieController;
