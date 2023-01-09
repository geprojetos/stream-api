import File from "../../../../utils/file";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class Utils {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public isSuccess(id: string) {
    return {
      message: Messages.movie().deleteSuccessfully,
      statusCode: Status.ok(),
      id,
    };
  }
}

export default Utils;
