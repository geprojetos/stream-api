import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { logger } from "../../../utils/logger";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { ICreateMovieAdapter } from "./ICreateMovieAdapter";
import { IConfig } from "../../../utils/config";
import Utils from "./Utils";
import Success from "./Success";
import Error from "./Error";

interface ValidateProps {
  movie: Stream;
  contentFile?: IStream[];
  isAlready?: IStream[];
}

class CreateMovieRepository implements ICreateMovieAdapter {
  private _file: File;
  private _defaultResponse: ICreateMovieResponse;
  private _success: Success;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._defaultResponse = {
      message: "",
      statusCode: 0,
    };
    this._success = new Success(this._file);
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      const response = await this._validate(movie);
      if (response) return response;
      return this._defaultResponse;
    } catch (error) {
      return Error.error(error);
    }
  }

  private async _validate(movie: Stream) {
    const contentFile: IStream[] = await this._file.read();
    const isAlready = Utils.isDuplicated({
      contentFile,
      movie,
    });

    const isAlreadyExisting = Utils.isAlreadyExisting({
      isAlready,
      movie,
    });

    if (isAlreadyExisting) return isAlreadyExisting;

    return this._success.isSuccess({ isAlready, movie, contentFile });
  }
}

export default CreateMovieRepository;
export { ValidateProps };
