import File from "../../../../utils/file";
import Utils from "./Utils";

class Validate {
  private _file: File;
  private _utils: Utils;

  constructor(file: File) {
    this._file = file;
    this._utils = new Utils(this._file);
  }

  public async isValidate() {
    return this._utils.isSuccess();
  }
}

export default Validate;
