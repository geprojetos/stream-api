import {
  IListMovieResponse,
  ListMovieUseCase,
} from "../../../../application-layer/useCase/movie";
import { Request } from "../../../../app";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class ListMovieController {
  constructor(private _createMovieUseCase: ListMovieUseCase) {}

  async execute(_: Request): Promise<IListMovieResponse> {
    const result = await this._createMovieUseCase.list();
    return {
      statusCode: Status.created(),
      message: Messages.movie().createSuccessfully,
      stream: result.stream,
    };
  }
}

export default ListMovieController;
