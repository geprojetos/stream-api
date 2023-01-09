import { IStream } from "../../../../../enterprise-layer/domain";
import File from "../../../../utils/file";
import Utils from "./Utils";

class Validate {
  private _file: File;
  private _utils: Utils;

  constructor(file: File) {
    this._file = file;
    this._utils = new Utils(this._file);
  }

  public async isValidate(movie: IStream) {
    const movies: IStream[] = await this._file.read();

    const isInvalidId = this._utils.isInvalidId(movie);
    if (isInvalidId) return isInvalidId;

    const isNotFind = this._utils.isNotFind({ movies, movie });
    if (isNotFind) return isNotFind;

    const isSuccess = await this._utils.isSuccess(movie);
    if (isSuccess) return isSuccess;

    return this._utils.isInValidData();
  }
}

export default Validate;
