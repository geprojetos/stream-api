import File from "../../../utils/file";
import { IEdit } from "./interface/IEdit";
import { IConfig } from "../../../utils/config";
import Success from "./utils/Success";
import Error from "./utils/Error";
import { IEditMovieResponse } from "../../../../application-layer/useCase/movie";
import { IStream } from "../../../../enterprise-layer/domain";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";

class EditRepository implements IEdit {
  private _file: File;
  private _success: Success;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._success = new Success(this._file);
  }

  async edit(movie: IStream): Promise<IEditMovieResponse> {
    try {
      return this._validate(movie);
    } catch (error) {
      return Error.error(error);
    }
  }

  private async _validate(movie: IStream) {
    if (!movie?.id) {
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().notIdToEdit,
      };
    }

    if (movie.title || movie.category || movie.description) {
      return await this._success.success(movie);
    }

    return {
      statusCode: Status.badRequest(),
      message: Messages.movie().notDataToEdit,
    };
  }
}

export default EditRepository;
