import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import File from "../../../utils/file";
import { ICreateMovieAdapter } from "./interface/ICreateMovieAdapter";
import { IConfig } from "../../../utils/config";
import Utils from "./utils/Utils";
import Success from "./utils/Success";
import Error from "./utils/Error";

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

    const isValid = Utils.isValid({
      movie,
    });
    if (isValid) return isValid;

    const isAlreadyExisting = Utils.isAlreadyExisting({
      movie,
      contentFile,
    });
    if (isAlreadyExisting) return isAlreadyExisting;

    return this._success.isSuccess({ movie, contentFile });
  }
}

export default CreateMovieRepository;
export { ValidateProps };
