import File from "../../../utils/file";
import { IListMovieAdapter } from "./interface/IListMovieAdapter";
import { IListMovieResponse } from "../../../../application-layer/useCase/movie/list/IList";
import { IConfig } from "../../../utils/config";
import Validate from "./utils/Validate";
import Error from "../../../utils/error";
import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";

class ListRepository implements IListMovieAdapter {
  private _file: File;
  private _validate: Validate;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._validate = new Validate(this._file);
  }

  async list(): Promise<IListMovieResponse> {
    try {
      return await this._validate.isValidate();
    } catch (error) {
      logger.error(`${Messages.movie().movieListingError} => ${error}`);
      return Error.isError(error);
    }
  }
}

export default ListRepository;
