import {
  EditMovieUseCase,
  IEditMovieResponse,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../frameworks-layer/app";

class EditMovieController {
  constructor(private _editMovieUseCase: EditMovieUseCase) {}

  async execute(request: Request): Promise<IEditMovieResponse> {
    const { id, title, category, description } = request.body;

    const result = await this._editMovieUseCase.edit({
      id,
      title,
      category,
      description,
    });
    return {
      statusCode: result.statusCode,
      message: result.message,
      id: result.id,
    };
  }
}

export default EditMovieController;
