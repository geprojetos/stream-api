import { IStream, Stream } from "../../domain";
import { logger } from "../../logger";
import { ICreateMovieResponse } from "../../useCase/movie";
import Messages from "../../utils/Messages";
import Status from "../../utils/Status";
import HelperDataBase from "./HelperDataBase";
import { IMovieAdapter } from "./IStreamAdapter";

class MovieRepository implements IMovieAdapter {
  private _streamList: IStream[];
  private _helperDataBase: HelperDataBase;

  constructor() {
    this._streamList = [];
    this._helperDataBase = new HelperDataBase(this._streamList);
    this._initialize();
  }

  private _initialize() {
    this._helperDataBase._readStreamDataBase();
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
    this._helperDataBase._saveStreamDataBase(this._streamList);

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
