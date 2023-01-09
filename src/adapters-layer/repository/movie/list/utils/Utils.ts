import File from "../../../../utils/file";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class Utils {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async isSuccess() {
    const result = await this._file.read();
    return {
      message: Messages.movie().listSuccessfully,
      statusCode: Status.ok(),
      movies: result || [],
    };
  }
}

export default Utils;
