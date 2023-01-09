import File from "../../../utils/file";
import { IEdit } from "./interface/IEdit";
import { IConfig } from "../../../utils/config";
import { IEditMovieResponse } from "../../../../application-layer/useCase/movie";
import { IStream } from "../../../../enterprise-layer/domain";
import Validate from "./utils/Validate";
import Error from "../../../utils/error";
import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";

class EditRepository implements IEdit {
  private _file: File;
  private _validate: Validate;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._validate = new Validate(this._file);
  }

  async edit(movie: IStream): Promise<IEditMovieResponse> {
    try {
      return this._validate.isValidate(movie);
    } catch (error) {
      logger.error(`${Messages.movie().editError} => ${error}`);
      return Error.isError(error);
    }
  }
}

export default EditRepository;
