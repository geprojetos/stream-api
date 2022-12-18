import File from "../../../utils/file";
import { IEdit } from "./interface/IEdit";
import { IConfig } from "../../../utils/config";
import Success from "./utils/Success";
import Error from "./utils/Error";
import { IEditMovieResponse } from "../../../../application-layer/useCase/movie";
import { IStream } from "../../../../enterprise-layer/domain";

class EditRepository implements IEdit {
  private _file: File;
  private _success: Success;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._success = new Success(this._file);
  }

  async edit(movie: IStream): Promise<IEditMovieResponse> {
    try {
      return await this._success.success(movie);
    } catch (error) {
      return Error.error(error);
    }
  }
}

export default EditRepository;
