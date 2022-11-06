import { IStream, Stream } from "../../../enterprise-layer/domain";
import { logger } from "../../../utils/logger";
import { ICreateMovieResponse } from "../../../application-layer/useCase/movie";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { IMovieAdapter } from "./IStreamAdapter";

class MovieRepository implements IMovieAdapter {
  private _streamList: IStream[];
  private _file: File;

  constructor() {
    this._streamList = [];
    this._file = new File(this._streamList);
    this._initialize();
  }

  private _initialize() {
    this._file._readMovieDataBase();
  }

  public async create(stream: Stream): Promise<ICreateMovieResponse> {
    try {
      return this._createSuccess(stream);
    } catch (error) {
      return this._createError(error);
    }
  }

  private _createSuccess(stream: Stream) {
    logger.info(Messages.stream().saveInDataBase);
    this._streamList.push(stream.stream());
    this._file._saveMovieDataBase(this._streamList);

    return {
      statusCode: Status.code().ok,
      message: Messages.stream().saveInDataBase,
      stream: stream.stream(),
    };
  }

  private _createError(error: unknown) {
    logger.error(error);
    return {
      statusCode: Status.code().badRequest,
      message: JSON.stringify(error),
    };
  }
}

export default MovieRepository;
