import { IStream, Stream } from "../../../enterprise-layer/domain";
import { logger } from "../../../adapters-layer/utils/logger";
import { ICreateMovieResponse } from "../../../application-layer/useCase/movie";
import Messages from "../../../adapters-layer/utils/messages";
import Status from "../../../adapters-layer/utils/status";
import { ICreateMovieAdapter } from "../../../adapters-layer/repository/movie/create/ICreateMovieAdapter";

class InMemoryCreateRepository implements ICreateMovieAdapter {
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

  private async _validate(movie: Stream) {
    if (this._isAlreadyExisting(movie)) {
      return this._isInvalid();
    }
    return await this._isValid(movie);
  }

  private _isAlreadyExisting(movie: Stream) {
    const { title } = movie.stream();
    return this._movieList.some((movie) => movie.title === title);
  }

  private _isInvalid() {
    return {
      statusCode: Status.conflict(),
      message: Messages.movie().alreadyExisting,
    };
  }

  private async _isValid(movie: Stream) {
    const transformMovieList = await this._transformMovieList(movie);
    this._movieList = transformMovieList;
    logger.info(`${Messages.movie().saveInDataBase} - ${movie.stream().id}`);

    return {
      statusCode: Status.created(),
      message: Messages.movie().saveInDataBase,
      stream: movie.stream(),
    };
  }

  private async _transformMovieList(movie: Stream): Promise<IStream[]> {
    const list = this._movieList;
    list.push(movie.stream());
    this._movieList = list;
    return this._movieList;
  }

  private _error(error: unknown) {
    logger.error(error);
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default InMemoryCreateRepository;
