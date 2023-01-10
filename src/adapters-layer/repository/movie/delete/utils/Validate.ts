import File from "../../../../utils/file";
import Utils from "./Utils";

class Validate {
  private _file: File;
  private _utils: Utils;

  constructor(file: File) {
    this._file = file;
    this._utils = new Utils(this._file);
  }

  public async isValidate(id: string) {
    const isNotFind = await this._utils.isNotFind(id);
    if (isNotFind) return isNotFind;

    return await this._utils.isSuccess(id);
  }
}

export default Validate;
