import {
  CreateMovieUseCase,
  ICreateMovieResponse,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../frameworks-layer/app";

class CreateMovieController {
  constructor(private _createMovieUseCase: CreateMovieUseCase) {}

  async execute(request: Request): Promise<ICreateMovieResponse> {
    const { title, category, description } = request.body;
    const result = await this._createMovieUseCase.create({
      title,
      category,
      description,
    });
    return {
      statusCode: result.statusCode,
      message: result.message,
      stream: result.stream,
    };
  }
}

export default CreateMovieController;
