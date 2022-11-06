import {
  CreateMovieUseCase,
  ICreateMovieResponse,
} from "../../../useCase/movie";
import { Request } from "../../../app";
import Messages from "../../../utils/Messages";
import Status from "../../../utils/Status";

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
      statusCode: Status.code().created,
      message: Messages.stream().createSuccessfully,
      stream: result.stream,
    };
  }
}

export default CreateMovieController;
