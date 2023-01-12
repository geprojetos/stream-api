import { Stream } from "../../../../../enterprise-layer/domain";
import { IConfig } from "../../../../utils/config";
import File from "../../../../utils/file";
import Utils from "./Utils";

class Validate {
  private _file: File;
  private _utils: Utils;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._utils = new Utils(this._file);
  }

  public async isValidate(movie: Stream) {
    const isInValid = this._utils.isInValid(movie);
    if (isInValid) return isInValid;

    const isAlreadyExisting = await this._utils.isAlreadyExisting(movie);
    if (isAlreadyExisting) return isAlreadyExisting;

    return await this._utils.isSuccess(movie);
  }
}

export default Validate;
