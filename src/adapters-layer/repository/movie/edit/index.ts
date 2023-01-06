import File from "../../../utils/file";
import { IEdit } from "./interface/IEdit";
import { IConfig } from "../../../utils/config";
import Success from "./utils/Success";
import Error from "./utils/Error";
import { IEditMovieResponse } from "../../../../application-layer/useCase/movie";
import { IStream } from "../../../../enterprise-layer/domain";
import Utils from "./utils/Utils";

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

  private async _validate(movie: IStream): Promise<IEditMovieResponse> {
    try {
      const movies: IStream[] = await this._file.read();

      const isInvalidId = Utils.isInvalidId(movie);
      if (isInvalidId) return isInvalidId;

      const isNotFind = Utils.isNotFind({ movies, movie });
      if (isNotFind) return isNotFind;

      if (Utils.isValidData(movie)) return await this._success.success(movie);

      return Utils.isInValidData();
    } catch (error) {
      return Error.error(error);
    }
  }
}

export default EditRepository;
