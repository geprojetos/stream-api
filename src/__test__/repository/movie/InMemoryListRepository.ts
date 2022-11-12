import { IStream, Stream } from "../../../enterprise-layer/domain";
import { logger } from "../../../utils/logger";
import { ICreateMovieResponse } from "../../../application-layer/useCase/movie";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";
import { ICreateMovieAdapter } from "../../../adapters-layer/repository/movie/create/ICreateMovieAdapter";

class InMemoryListRepository implements ICreateMovieAdapter {
  private _movieList: IStream[];

  constructor() {
    this._movieList = [];
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      return this._validate(movie);
    } catch (error) {
      return this._error(error);
    }
  }
}

export default InMemoryListRepository;
