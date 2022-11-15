import Messages from "../../../adapters-layer/utils/messages";
import Status from "../../../adapters-layer/utils/status";
import { IListMovieAdapter } from "../../../adapters-layer/repository/movie/list/IListMovieAdapter";
import { IStream } from "../../../enterprise-layer/domain";
import { IListMovieResponse } from "../../../application-layer/useCase/movie";

class InMemoryListMovieRepository implements IListMovieAdapter {
  private _movieList: IStream[];

  constructor() {
    this._movieList = [];
  }

  async list(): Promise<IListMovieResponse> {
    try {
      return await this._isSuccess();
    } catch (error) {
      return this._isError(error);
    }
  }

  private async _isSuccess() {
    const result = this._movieList;
    return {
      message: Messages.movie().listSuccessfully,
      statusCode: Status.ok(),
      movies: result,
    };
  }

  private _isError(error: unknown) {
    return {
      message: Messages.movie().movieListingError,
      statusCode: Status.badRequest(),
    };
  }
}

export default InMemoryListMovieRepository;
