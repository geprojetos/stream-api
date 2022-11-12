import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { logger } from "../../../../utils/logger";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import File from "../../../../utils/file";
import { ICreateMovieAdapter } from "./ICreateMovieAdapter";

class MovieRepository implements ICreateMovieAdapter {
  private _movieList: IStream[];
  private _file: File;

  constructor() {
    this._movieList = [];
    this._file = new File(this._movieList);
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      return this._validate(movie);
    } catch (error) {
      return this._error(error);
    }
  }

  private _validate(movie: Stream) {
    if (this._isAlreadyExisting(movie)) {
      return this._isInvalid();
    }
    return this._isValid(movie);
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

  private _isValid(movie: Stream) {
    logger.info(Messages.movie().saveInDataBase);
    this._movieList.push(movie.stream());
    this._file._saveMovieDataBase(this._movieList);

    return {
      statusCode: Status.created(),
      message: Messages.movie().saveInDataBase,
      stream: movie.stream(),
    };
  }

  private _error(error: unknown) {
    logger.error(error);
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default MovieRepository;
