import { IDeleteMovieResponse } from "../../../../application-layer/useCase/movie";
import { IConfig } from "../../../utils/config";
import Error from "../../../utils/error";
import File from "../../../utils/file";
import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";
import { IDeleteMovieAdapter } from "./interface/IDeleteMovieAdapter";
import Validate from "./utils/Validate";

class DeleteMovieRepository implements IDeleteMovieAdapter {
  private _file: File;
  private _validate: Validate;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._validate = new Validate(this._file);
  }

  public async delete(id: string): Promise<IDeleteMovieResponse> {
    try {
      return await this._validate.isValidate(id);
    } catch (error) {
      logger.error(`${Messages.movie().deleteError} => ${error}`);
      return Error.isError(error);
    }
  }
}

export default DeleteMovieRepository;
