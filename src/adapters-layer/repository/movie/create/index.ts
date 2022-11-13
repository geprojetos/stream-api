import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { logger } from "../../../../utils/logger";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import File from "../../../../utils/file";
import { ICreateMovieAdapter } from "./ICreateMovieAdapter";

class CreateMovieRepository implements ICreateMovieAdapter {
  private _movieList: IStream[];
  private _file: File;

  constructor() {
    this._movieList = [];
    this._file = File.getInstance();
    this._initialize();
  }

  private async _initialize() {
    const result = await this._file.getCopyMovies();
    if (result) {
      this._movieList = result;
    }
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      await this._initialize();
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
    this._file._saveMovieDataBase(transformMovieList);
    logger.info(`${Messages.movie().saveInDataBase} - ${movie.stream().id}`);

    return {
      statusCode: Status.created(),
      message: Messages.movie().saveInDataBase,
      stream: movie.stream(),
    };
  }

  private async _transformMovieList(movie: Stream): Promise<IStream[]> {
    const list = await this._file.getCopyMovies();
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

export default CreateMovieRepository;
